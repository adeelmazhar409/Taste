// src/routes/api/whisper/+server.ts
import type { RequestHandler } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import { PRIVATE_OPENAI_API_KEY } from "$env/static/private";
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";
import OpenAI from "openai";

const voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;

let details: {
  missing: any;
  year?: any;
  genre?: any;
  storyline?: any;
  type?: any;
};

function extractMovieDetails(input) {
  const yearRegex = /\b(19|20)\d{2}\b/;
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  const genreRegex = new RegExp(genres.join("|"), "i");

  const typeKeywords = {
    movie: ["movie", "film"],
    tv: ["tv", "series", "show"],
  };

  const yearMatch = input.match(yearRegex);
  const year = yearMatch ? yearMatch[0] : null;

  const genreMatch = input.match(genreRegex);
  const genre = genreMatch ? genreMatch[0].toLowerCase() : null;

  const storyline = input.split("like").pop().trim() || null;

  let type = null;
  for (const [key, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some((keyword) => input.toLowerCase().includes(keyword))) {
      type = key;
      break;
    }
  }

  return {
    year,
    genre,
    storyline,
    type,
    missing: {
      year: !year,
      genre: !genre,
      storyline: !storyline,
      type: !type,
    },
  };
}

function handleUserInput(input) {
  details = extractMovieDetails(input);

  if (
    details.missing.year ||
    details.missing.genre ||
    details.missing.storyline ||
    details.missing.type
  ) {
    let missingPrompt = "Could you provide more details? Specifically:\n";

    if (details.missing.year) {
      missingPrompt += "- What year or range of years are you interested in?\n";
    }
    if (details.missing.genre) {
      missingPrompt +=
        "- What genre would you like? For example: action, comedy, drama, etc.\n";
    }
    if (details.missing.storyline) {
      missingPrompt +=
        "- Can you describe the storyline or plot you're looking for?\n";
    }
    if (details.missing.type) {
      missingPrompt += "- Are you looking for a movie or a TV series?\n";
    }

    return {
      status: "missing_details",
      prompt: missingPrompt,
    };
  }
  return {
    status: "continue to database",
  };
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const supabase = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SUPABASE_SERVICE_ROLE_KEY
  );
  const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });
  const formData = await request.formData();
  const audioFile = formData.get("file");
  const selectedVoice = formData.get("selectedVoice");

  if (!(audioFile instanceof Blob)) {
    return new Response(JSON.stringify({ error: "Invalid file upload" }), {
      status: 400,
    });
  }
  const whisperResponse = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PRIVATE_OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!whisperResponse.ok) {
    const errorData = await whisperResponse.json();
    return new Response(JSON.stringify({ error: errorData }), {
      status: whisperResponse.status,
    });
  }

  const whisperData = await whisperResponse.json();
  const transcription = whisperData.text;
  console.log(transcription);

  const response = handleUserInput(transcription);

  if (response.status === "missing_details") {
    console.log(response.prompt);
    if (response.prompt) {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: selectedVoice as (typeof voices)[number],
        input: response.prompt,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      const base65Audio = buffer.toString("base64");

      const { data: fileList, error: listError } = await supabase.storage
        .from("audio-bucket")
        .list("", { search: "speech.mp3" });

      if (fileList) {
        const { error: deleteError } = await supabase.storage
          .from("audio-bucket")
          .remove(["speech.mp3"]);
      }
      const { data: audio, error } = await supabase.storage
        .from("audio-bucket")
        .upload("speech.mp3", buffer, {
          contentType: "audio/mp3",
        });

      if (error) {
        console.error("Error uploading file:", error);
        return json({ message: "Error uploading audio file" }, { status: 500 });
      }

      return json({
        base65Audio,
      });
    }
  } else {
    locals.resultData = details;
    return json({
      details,
    });
  }
};
