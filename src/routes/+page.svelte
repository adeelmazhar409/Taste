<script>
  import { goto } from "$app/navigation";

  let showOptions = false;

  function toggleDropdown() {
    showOptions = !showOptions;
  }
</script>

<div class="relative w-full min-h-screen">
  <!-- Background Image (fixed position) -->
  <div
    class="fixed inset-0 bg-cover bg-center"
    style="background-image: url('../mainpagemoviebackground.png');"
  ></div>

  <!-- Color Overlay -->
  <div class="fixed inset-0 bg-[#001016] opacity-90"></div>

  <!-- Main Content -->
  <div
    class="relative w-full z-10 gap-5 flex flex-col items-center text-white py-6"
  >
    <!-- Logo -->
    <div class="flex justify-center w-full">
      <img src="../logo.png" alt="Logo" class="w-32" />
    </div>

    <div class="mt-6 w-full h-12 bg-black/50"></div>
    <!-- Main Text -->
    <div
      class="text-5xl text-white font-poiret bg-[#2A0B0B] opacity-70 w-full text-center p-6 justify-around"
    >
      <p class="text-4xl">Find Your Taste</p>
      <p class="text-lg font-thin"></p>

      <!-- button -->
      <div class="relative inline-block font-poiret">
        <!-- Main Button -->
        <button
          on:click={toggleDropdown}
          class="bg-inherit text-white text-3xl delay-50 hover:scale-110 ease-in-out px-6 py-2 rounded-full shadow-lg hover:bg-black/50 transition-transform duration-300"
        >
          Start
        </button>

        <!-- Dropdown Options -->
        <div
          class={`flex items-center ${showOptions ? "opacity-100" : "opacity-0"} w-full transition-opacity duration-300 ease-in-out`}
        >
          <!-- Option 1: Positioned to the left of the button -->
          <button
            on:click={() => goto("mcq")}
            class={`absolute -left-[120px] top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 ${
              showOptions ? "translate-x-0" : "-translate-x-10"
            }`}
          >
            Filling Option
          </button>

          <!-- Option 2: Positioned to the right of the button -->
          <button
            on:click={() => goto("voice")}
            class={`absolute -right-28 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 ${
              showOptions ? "translate-x-0" : "translate-x-10"
            }`}
          >
            Ai Assiatant
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
