<script setup lang="ts">
</script>

<template>
  <section class="py-12 sm:py-20 overflow-hidden">
    <div class="mx-auto container px-4 grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16 items-center">
      <!-- Image Section with enhanced effects -->
      <div class="relative order-1 group">
        <!-- Decorative background shape -->
        <div 
          v-scroll-reveal="{ threshold: 0.1 }"
          class="absolute -right-4 sm:-right-6 -top-4 sm:-top-6 w-1/2 h-1/2 bg-primary/10 rounded-full blur-2xl sm:blur-3xl transition-all duration-1000 group-hover:scale-150 group-hover:bg-primary/20"
        ></div>
        
        <div 
          v-scroll-reveal="{ threshold: 0.2 }"
          class="relative z-10 aspect-video sm:aspect-video overflow-hidden rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-700 transform hover:shadow-primary/20"
        >
          <img 
            src="@/assets/images/about-us.png" 
            alt="about us firefighting equipment" 
            class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 floating-image"
          />
          
          <!-- Glossy overlay effect -->
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <!-- Animated accent border -->
        <div 
          v-scroll-reveal="{ threshold: 0.3 }"
          class="absolute -left-3 sm:-left-4 -bottom-3 sm:-bottom-4 w-full h-full border border-primary/30 rounded-2xl -z-10 transition-transform duration-500 group-hover:translate-x-1 sm:group-hover:translate-x-2 group-hover:translate-y-1 sm:group-hover:translate-y-2"
        ></div>
      </div>

      <!-- Text Content -->
      <div class="space-y-4 sm:space-y-6 order-2">
        <h3 class="text-2xl sm:text-3xl font-bold text-neutral-900 max-xs:text-xl" v-scroll-reveal>About Us</h3>
        <div v-scroll-reveal="{ threshold: 0.2 }" class="space-y-4">
          <p class="text-neutral-600 leading-relaxed text-sm sm:text-base">
            The Barners is your go-to online shop for all fire equipment needs. Founded with a passion for safety, we
            offer a wide range of high-quality firefighting gear, including helmets, hoses, extinguishers, and protective
            clothing.
          </p>
          <p class="text-neutral-600 leading-relaxed text-sm sm:text-base hidden sm:block">
            Our mission is to equip fire departments and safety enthusiasts with the best tools available,
            ensuring that everyone is prepared for emergencies. With a user-friendly website and fast shipping, The
            Barners makes it easy to find and purchase the equipment you need to stay safe and effective in the field.
          </p>
        </div>
        
        <div v-scroll-reveal="{ threshold: 0.3 }" class="flex pt-4">
          <NuxtLink to="/about" class="w-full sm:w-auto text-center rounded-xl px-8 py-3 text-neutral-900 border border-neutral-200 bg-white font-bold hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 active:scale-95 shadow-sm">
            Learn More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
}

.floating-image {
  animation: float 6s ease-in-out infinite;
}

/* Pause animation on hover to allow the hover scale to take over smoothly */
.group:hover .floating-image {
  animation-play-state: paused;
}
</style>