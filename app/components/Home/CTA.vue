<template>
  <section class="bg-[#F2F2F4] py-12 sm:py-20 overflow-hidden">
    <div class="mx-auto container px-4 grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16 items-center">
      <!-- Image Section -->
      <div class="relative group order-1">
        <div 
          v-scroll-reveal="{ threshold: 0.1 }"
          class="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 w-1/2 h-1/2 bg-primary/10 rounded-full blur-2xl sm:blur-3xl transition-all duration-1000 group-hover:scale-150 group-hover:bg-primary/20"
        ></div>
        
        <div 
          v-scroll-reveal="{ threshold: 0.2 }"
          class="relative z-10 aspect-video overflow-hidden rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-700 transform hover:shadow-primary/20"
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
          class="absolute -right-3 sm:-right-4 -bottom-3 sm:-bottom-4 w-full h-full border border-primary/30 rounded-2xl -z-10 transition-transform duration-500 group-hover:-translate-x-1 sm:group-hover:-translate-x-2 group-hover:-translate-y-1 sm:group-hover:-translate-y-2"
        ></div>
      </div>

      <!-- Text Content -->
      <div class="order-2 space-y-4 sm:space-y-6">
        <h3 class="text-2xl sm:text-3xl font-bold text-neutral-900 max-xs:text-xl" v-scroll-reveal>
          Are you shopping for your department?
        </h3>
        <p class="text-neutral-600 text-sm sm:text-lg" v-scroll-reveal="{ threshold: 0.2, delay: 100 }">
          Do you have any questions? Our team is here to help you find the right equipment for your mission.
        </p>
        
        <div class="pt-4 flex flex-col sm:flex-row gap-4" v-scroll-reveal="{ threshold: 0.3, delay: 200 }">
          <a href="tel:+1 866-722-7637" class="flex-1 sm:flex-none">
            <button class="w-full sm:px-12 py-3 bg-[#FF2600] text-white font-bold rounded-xl shadow-lg shadow-red-500/10 hover:bg-[#D92100] transition-all duration-300 active:scale-95 text-sm uppercase tracking-wider">
              Call Us
            </button>
          </a>
          <a href="mailto:contact@barnesfire.com" class="flex-1 sm:flex-none">
            <button class="w-full sm:px-12 py-3 text-neutral-900 border border-neutral-200 bg-white font-bold rounded-xl hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 active:scale-95 text-sm uppercase tracking-wider">
              Email Us
            </button>
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