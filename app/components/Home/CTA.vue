<template>
  <section class="bg-[#F2F2F4] py-20 overflow-hidden">
    <div class="mx-auto container px-4 grid grid-cols-2 gap-12 items-center max-xl:grid-cols-1">
      <!-- Image Section with enhanced effects -->
      <div class="relative group">
        <div 
          v-scroll-reveal="{ threshold: 0.1 }"
          class="absolute -left-6 -top-6 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 group-hover:scale-150 group-hover:bg-primary/20"
        ></div>
        
        <div 
          v-scroll-reveal="{ threshold: 0.2 }"
          class="relative z-10 aspect-video overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 transform hover:shadow-primary/20"
        >
          <img 
            src="@/assets/images/about-us-3.jpg" 
            alt="cta firefighting gear" 
            class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 floating-image"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div 
          v-scroll-reveal="{ threshold: 0.3 }"
          class="absolute -right-4 -bottom-4 w-full h-full border border-primary/30 rounded-2xl -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"
        ></div>
      </div>

      <!-- Text Content (Reverted to original) -->
      <div>
        <h3 class="text-3xl font-semibold text-neutral-900 max-sm:text-xl" v-scroll-reveal>Are you shopping for your department?</h3>
        <p class="mt-2 text-neutral-600" v-scroll-reveal="{ threshold: 0.2, delay: 100 }">Do you have any questions? Contact us.</p>
        
        <div class="mt-10 flex gap-6 flex-wrap" v-scroll-reveal="{ threshold: 0.3, delay: 200 }">
          <a href="tel:+1 866-722-7637">
            <button class="rounded-xl bg-[#FF2600] px-20 py-3 text-white cursor-pointer hover:bg-red-700 transition-colors duration-300">Call</button>
          </a>
          <a href="mailto:contact@barnesfire.com">
            <button class="rounded-xl px-20 py-3 text-black border border-[#868686] border-solid cursor-pointer hover:bg-white transition-colors duration-300">Email</button>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.01); }
  100% { transform: translateY(0px) scale(1); }
}

.floating-image {
  animation: float 5s ease-in-out infinite;
}

.group:hover .floating-image {
  animation-play-state: paused;
}
</style>