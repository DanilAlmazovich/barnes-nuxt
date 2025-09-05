<script setup lang="ts">

</script>

<template>
  <div class="pt-10 mb-6">
    <div class="container">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4 max-md:text-xs">
        <nuxt-link to="/">
          <span>Home</span>
        </nuxt-link>
        <i class="pi pi-angle-right"></i>
        <span>About US</span>
      </div>
    </div>
  </div>
  <div class="relative h-[1010px]">
    <div class="bg-black/75 w-full h-full absolute left-0 top-0"></div>
    <div class="flex absolute w-full h-full left-0 top-0 items-center justify-center">
      <div class="container flex flex-col items-center justify-center gap-4 py-10 max-md:py-4">
        <div>
          <img src="@/assets/images/about-logo.png" class="max-md:w-40" alt="">
        </div>
        <div class="flex flex-col gap-4">
          <h1 class="text-white text-center text-2xl font-semibold max-md:text-xl">Our Story: Born from Bravery, Built for Safety</h1>
          <p class="text-white text-center text-xl max-lg:text-base max-sm:text-sm">
            The roots of our company stretch back to a time when courage wasn’t just a word—it was a way of life. My
            grandfather, a lifelong firefighter, spent decades on the frontlines battling blazes, rescuing families, and
            standing tall through the darkest hours of the night. He never saw it as a job. It was a calling. One that
            demanded sacrifice, heart, and an unwavering commitment to protect.
          </p>
          <p class="text-white text-center text-xl max-lg:text-base max-sm:text-sm">
            After years of service, he retired early—but retirement didn’t mean slowing down. Instead, he found a new
            mission. He saw firsthand how under-resourced many communities were—towns where fire departments lacked proper
            gear, neighborhoods where homes had no smoke alarms, and schools that had never practiced a fire drill. He
            began gathering equipment, donating supplies, and lending his knowledge to help places that needed it most.
            From city centers to rural firehouses, he became known as the man who never stopped showing up when it
            mattered
          </p>
          <p class="text-white text-center text-xl max-lg:text-base max-sm:text-sm">Inspired by his legacy, we built this company with a simple goal: to carry his mission forward. Today, we’re
            proud to specialize in fire safety equipment, firefighting tools, and emergency support solutions. But more
            than that, we’re here to serve. To protect. To ensure that every firefighter has what they need, and every
            family has the tools to stay safe.</p>
          <p class="text-white text-center text-xl max-lg:text-base max-sm:text-sm">This isn’t just business for us—it’s personal. It’s a promise to continue the work my grandfather started,
            and to honor every brave soul who runs toward the fire when others run away.</p>
        </div>
      </div>
    </div>
    <img class="w-full h-full object-cover" src="@/assets/images/about-example.jpg" alt="">
  </div>
  <HomeCTA class="py-24"/>
</template>
