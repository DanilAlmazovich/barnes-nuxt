<script setup lang="ts">

</script>

<template>
  <section class="py-20">
    <div class="mx-auto container px-4 grid grid-cols-2 gap-12 items-center max-xl:grid-cols-1">
      <div class="space-y-4">
        <h3 class="text-3xl font-semibold text-neutral-900 max-sm:text-xl">About Us</h3>
        <p class="text-neutral-600 leading-relaxed">
          The Barners is your go-to online shop for all fire equipment needs. Founded with a passion for safety, we
          offer a wide range of high-quality firefighting gear, including helmets, hoses, extinguishers, and protective
          clothing. Our mission is to equip fire departments and safety enthusiasts with the best tools available,
          ensuring that everyone is prepared for emergencies. With a user-friendly website and fast shipping, The
          Barners makes it easy to find and purchase the equipment you need to stay safe and effective in the field.
        </p>
        <div class="flex gap-3 pt-6">
          <NuxtLink to="/about" class="rounded-xl px-12 py-3 text-black border border-[#868686] border-solid ">More</NuxtLink>
        </div>
      </div>
      <div class="relative aspect-video overflow-hidden rounded-2xl">
        <img src="@/assets/images/about-us.png" alt="about" class="h-full w-full object-cover"/>
      </div>
    </div>
  </section>
</template>