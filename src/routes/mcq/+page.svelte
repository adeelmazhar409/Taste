<script>
  import { onMount } from "svelte";
  import Posterselection from "$lib/mcqs/posterselection.svelte";
  import Opt from "$lib/forms/option/opt.svelte";

  let isGrid = false;
  let newcomp = 0;
  let firstoption = "";

  let arr = [
    "Released 5 years ago",
    "Released 10 years ago",
    "Released 15 years ago",
    "Released 20 years ago",
    "Doesn't matter",
  ];

  function handleNext() {
    isGrid = true;
    newcomp++;
    console.log("New comp value:", newcomp);
  }
  function handleClick(bar) {
    firstoption = bar;
  }

  let secondoption = "";

  let arr2 = [
    "Top Movies",
    "Hidden Gems",
    "Criticaly aclaimed",
    "Doesn't matter",
  ];

  function handleClick2(bar) {
    secondoption = bar;
  }

  let thirdoption = "";

  let arr3 = ["Sad 😞", "Neutral 😐", "Happy 😊"];

  function handleClick3(bar) {
    thirdoption = bar;
  }

  let clickedBars = [];

  let arr4 = [
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
  ];

  let arr5 = [
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
    "Horror",
    "Doesn't matter",
  ];

  function handleClick4(bar) {
    if (bar === "Doesn't matter") {
      if (!clickedBars.includes(bar)) {
        // If "Doesn't matter" is selected and not already in the array, add it
        clickedBars = [bar];
      }
    } else {
      if (clickedBars.includes("Doesn't matter")) {
        // If "Doesn't matter" is already selected, remove it when selecting another option
        clickedBars = [bar];
      } else {
        if (clickedBars.includes(bar)) {
          // If the bar is already selected, remove it
          clickedBars = clickedBars.filter((item) => item !== bar);
        } else {
          // If there are already 5 items, remove the first item before adding the new one
          if (clickedBars.length >= 5) {
            clickedBars.shift();
          }
          clickedBars = [...clickedBars, bar];
        }
      }
    }
  }
</script>

<div
  class="fixed inset-0 bg-cover bg-center"
  style="background-image: url('../back.jpg');"
></div>

<!-- Color Overlay -->
<div
  class="fixed inset-0 bg-gradient-to-r from-[#051721] via-black to-[#210505] opacity-95 transition-opacity"
></div>

<!-- Main Content -->
<div
  class="relative z-10 text-white h-screen {isGrid ? 'grid' : 'flex flex-col'}"
>
  <!-- Header Section -->
  <div
    class="relative text-4xl z-10 bg-gradient-to-r from-[#fff0] h-fit via-sky-50 font-semibold flex justify-center font-poiret text-black opacity-70 w-full text-center p-4"
  >
    <a href="/">
      <img
        src="../logo.png"
        alt="Logo"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 z-10 opacity-90"
      />
    </a>
    <div class="relative z-10 flex items-center justify-center">
      "Discover Your <b style="color: #fff0; user-select: none;">---------</b> Movie
      Taste!"
    </div>
  </div>

  {#if newcomp === 0}
    <!-- <div class="w-full flex z-10 justify-center gap-4 my-10 h-full">
      <button
        id="movies-poster"
        class="h-full md:w-1/5 w-full rounded-xl bg-cover bg-center cursor-pointer transform transition-transform duration-500 ease-in-out"
        style="background-image: url('https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_FMjpg_UX1000_.jpg');"
        on:click={() => handleDivClick("movies")}
      >
        <div
          class="h-full w-full bg-black rounded-xl text-center flex items-center justify-center font-poiret text-6xl font-bold"
          style="opacity: {clickedDiv === 'movies' ? 1 : 0.6}"
        >
          Movies
        </div>
      </button>

      <button
        id="series-poster"
        class="h-full md:w-1/5 w-full rounded-xl bg-cover bg-center cursor-pointer transform transition-transform duration-500 ease-in-out"
        style="background-image: url('https://preview.redd.it/drd9eqknks481.jpg?width=1080&crop=smart&auto=webp&s=00776b18b0215c23db02ed7392ec7f7a52ab3c01');"
        on:click={() => handleDivClick("series")}
      >
        Series
      </div>
    </button>
  </div>

  {#if clickedDiv}
    <a
      href=""
      class="bg-custom-dark text-3xl p-4 w-fit mx-auto rounded-xl opacity-80 my-4"
      on:click={handleNext}
    >
      Next
    </a>
  {/if}


    {#if clickedDiv}
      <button
        class="bg-custom-dark text-3xl p-4 w-fit mx-auto rounded-xl opacity-80 my-4"
        on:click={handleNext}
      >
        Next
      </button>
    {/if} -->
    <Posterselection {handleNext} />
  {/if}

  {#if newcomp === 1}
    <div
      class="grid grid-cols-2 grid-rows-6 2xl 2xl:w-1/2 xl:w-2/3 m-8 lg:w-3/4 mx-auto h-fit"
    >
      <div
        class="relative row-span-10 bg-white opacity-70 text-black rounded-3xl font-poiret text-4xl font-semibold justify-center items-center grid p-8 text-center overflow-hidden"
      >
        <!-- Text -->
        <div class="relative z-10 flex flex-col items-center">
          “Select Time period for Movies”
        </div>
      </div>

      <div class="row-span-6 my-7 grid gap-4 overflow-hidden relative">
        {#each arr as label, i}
          <button
            class="sliding-bar bg-[#0B4F6C] font-poiret text-2xl text-center p-3 rounded-e-xl ease-in-out hover:scale-125"
            on:click={() => handleClick(label)}
            style="
            width: {firstoption === label ? '100%' : '85%'};
            background-color: {firstoption === label ? 'white' : '#0B4F6C'};
            color: {firstoption === label ? '#0B4F6C' : 'white'};
          "
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Next Button -->
    <div class="mx-auto">
      {#if firstoption}
        <button
          on:click={handleNext}
          class="bg-custom-dark font-poiret h-fit text-3xl p-4 w-fit mx-auto rounded-xl opacity-80 transition-opacity duration-500 ease-in-out"
        >
          Next
        </button>
      {/if}
    </div>
  {/if}

  {#if newcomp === 2}
    <div
      class="grid grid-cols-2 grid-rows-6 2xl 2xl:w-1/2 xl:w-2/3 m-8 lg:w-3/4 mx-auto h-fit"
    >
      <div
        class="relative row-span-10 bg-white opacity-70 text-black rounded-3xl font-poiret text-4xl font-semibold justify-center items-center grid p-8 text-center overflow-hidden"
      >
        <!-- Text -->
        <div class="relative z-10 flex flex-col items-center">
          “Movies should Be”
        </div>
      </div>

      <div class="row-span-6 my-7 grid gap-4 overflow-hidden relative">
        {#each arr2 as label, i}
          <button
            class="sliding-bar bg-[#0B4F6C] font-poiret text-2xl text-center p-3 rounded-e-xl"
            on:click={() => handleClick2(label)}
            style="
            width: {secondoption === label ? '100%' : '85%'};
            background-color: {secondoption === label ? 'white' : '#0B4F6C'};
            color: {secondoption === label ? '#0B4F6C' : 'white'};
          "
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Next Button -->
    <div class="mx-auto">
      {#if secondoption}
        <button
          on:click={handleNext}
          class="bg-custom-dark font-poiret h-fit text-3xl p-4 w-fit mx-auto rounded-xl opacity-80 transition-opacity duration-500 ease-in-out"
        >
          Next
        </button>
      {/if}
    </div>
  {/if}

  {#if newcomp === 3}
    <div
      class="grid grid-cols-2 grid-rows-6 2xl 2xl:w-1/2 xl:w-2/3 m-8 lg:w-3/4 mx-auto h-fit"
    >
      <div
        class="relative row-span-10 bg-white opacity-70 text-black rounded-3xl font-poiret text-4xl font-semibold justify-center items-center grid p-8 text-center overflow-hidden"
      >
        <!-- Text -->
        <div class="relative z-10 flex flex-col items-center">
          “How is your mood”
        </div>
      </div>

      <div class="row-span-6 my-7 grid gap-4 overflow-hidden relative">
        {#each arr3 as label, i}
          <button
            class="sliding-bar bg-[#0B4F6C] font-poiret text-2xl text-center p-3 rounded-e-xl"
            on:click={() => handleClick3(label)}
            style="
            width: {thirdoption === label ? '100%' : '85%'};
            background-color: {thirdoption === label ? 'white' : '#0B4F6C'};
            color: {thirdoption === label ? '#0B4F6C' : 'white'};
          "
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Next Button -->
    <div class="mx-auto">
      {#if thirdoption}
        <button
          on:click={handleNext}
          class="bg-custom-dark font-poiret h-fit text-3xl p-4 w-fit mx-auto rounded-xl opacity-80 transition-opacity duration-500 ease-in-out"
        >
          Next
        </button>
      {/if}
    </div>
  {/if}

  {#if newcomp === 4}
    <div
      class="grid grid-cols-3 grid-rows-10 2xl 2xl:w-1/2 xl:w-2/3 m-8 lg:w-3/4 mx-auto"
    >
      <div class="row-span-10 my-4 grid gap-2 overflow-hidden relative">
        {#each arr4 as label, i}
          <button
            class="animated-bar bg-[#0B4F6C] font-poiret text-xl text-center p-2"
            on:click={() => handleClick4(label)}
            style="
          margin-right: {clickedBars.includes(label) ? '10%' : '0%'};
            margin-left: {clickedBars.includes(label) ? '10%' : '0%'};
          border-top-left-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0.3rem'};
          border-bottom-left-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0.3rem'};
          border-top-right-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0rem'};
          border-bottom-right-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0rem'};
         
          background-color:{clickedBars.includes(label) ? 'white' : '#0B4F6C'};
          color:{clickedBars.includes(label) ? '#0B4F6C' : 'white'}
         
          "
          >
            {label}
          </button>
        {/each}
      </div>

      <!-- Black Box -->
      <div
        class="row-span-10 bg-white opacity-70 text-black rounded-3xl font-poiret text-4xl font-semibold justify-center items-center grid p-8 text-center"
      >
        “Select Genre”

        <div class="mx-auto m-4">
          {#if clickedBars.length > 0}
            <button
              on:click={handleNext}
              class="bg-custom-dark inset-0 opacity-100 w-fit h-fit font-poiret text-2xl p-4 rounded-lg hover:opacity-100"
            >
              NEXT
            </button>
          {/if}
        </div>
      </div>

      <!-- Container for Red Bars -->

      <div class="row-span-10 my-4 grid gap-2 overflow-hidden relative">
        <!-- Animated Bars -->
        {#each arr5 as label, i}
          <button
            class="animated-bar bg-[#0B4F6C] font-poiret text-xl text-center p-2"
            on:click={() => handleClick4(label)}
            style="
          margin-right: {clickedBars.includes(label) ? '10%' : '0%'};
            margin-left: {clickedBars.includes(label) ? '10%' : '0%'};
          border-top-left-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0rem'};
          border-bottom-left-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0rem'};
          border-top-right-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0.3rem'};
          border-bottom-right-radius: {clickedBars.includes(label)
              ? '0.6rem'
              : '0.3rem'};
          
           background-color:{clickedBars.includes(label) ? 'white' : '#0B4F6C'};
          color:{clickedBars.includes(label) ? '#0B4F6C' : 'white'}
        "
          >
            {label}
          </button>
        {/each}
      </div>
    </div>
    <div></div>
  {/if}

  {#if newcomp === 5}
    <div
      class="mx-auto bg-[#0b4f6c59] h-fit text-2xl font-medium p-4 rounded-lg font-poiret"
    >
      Write Your dream story And get preference!
    </div>

    <div class="w-full justify-center flex">
      <textarea
        id="dream-story"
        class="p-4 w-1/2 h-48 text-[#0B4F6C] text-lg font-medium bg-[#ffffff37] rounded-lg shadow-lg resize-none outline-none focus:ring-4 focus:ring-[#0B4F6C] placeholder-[#8F8F8F] placeholder-opacity-75 transition-all duration-300"
        placeholder="Start writing your dream story here..."
      ></textarea>
    </div>

    <div id="error-message" class="text-red-500 text-center mt-2 hidden">
      Your story should include at least 20 letters!
    </div>

    <div class="mx-auto my-auto mt-4 flex gap-4 justify-center">
      <button
        id="next-btn"
        class="bg-gray-700 text-gray-400 p-3 rounded-md cursor-not-allowed"
        disabled
      >
        NEXT
      </button>
      <a href="/result" class="bg-white text-black p-3 rounded-md">Skip</a>
    </div>

    <script>
      const textarea = document.getElementById("dream-story");
      const nextButton = document.getElementById("next-btn");
      const errorMessage = document.getElementById("error-message");

      textarea.addEventListener("input", () => {
        // Count the number of letters (ignore spaces and non-alphabet characters)
        const letterCount = textarea.value.replace(/[^a-zA-Z]/g, "").length;

        if (letterCount > 20) {
          nextButton.disabled = false;
          nextButton.classList.remove(
            "bg-gray-700",
            "text-gray-400",
            "cursor-not-allowed"
          );
          nextButton.classList.add(
            "bg-blue-600",
            "text-white",
            "cursor-pointer"
          );
          errorMessage.classList.add("hidden"); // Hide error message
        } else {
          nextButton.disabled = true;
          nextButton.classList.add(
            "bg-gray-700",
            "text-gray-400",
            "cursor-not-allowed"
          );
          nextButton.classList.remove(
            "bg-blue-600",
            "text-white",
            "cursor-pointer"
          );
        }
      });

    if (letterCount >= 20) {
      // Enable the button and hide error message
      nextButton.disabled = false;
        }
      });
    </script>
  {/if}
</div>
