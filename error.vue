<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50">
    <!-- Используем стандартные теги или авто-импортируемые компоненты без явного импорта -->
    <Header />
    
    <main class="flex-grow flex items-center justify-center px-6 py-24">
      <div v-if="error" class="max-w-md w-full text-center space-y-8">
        <!-- Animated Icon -->
        <div class="relative mx-auto w-32 h-32">
          <div class="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
          <div class="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-xl border border-neutral-100">
            <span class="text-6xl font-black text-primary">{{ error.statusCode || '500' }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <h1 class="text-4xl font-extrabold text-neutral-900 tracking-tight">
            {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
          </h1>
          <p class="text-neutral-500 text-lg leading-relaxed">
            {{ error.statusCode === 404 
              ? "The page you are looking for doesn't exist or has been moved." 
              : error.message || "An unexpected error occurred." 
            }}
          </p>
        </div>

        <div class="pt-6">
          <button 
            @click="handleError"
            class="inline-flex items-center justify-center px-10 py-3.5 bg-[#FF2600] text-white font-bold rounded-xl shadow-lg shadow-red-500/10 hover:bg-red-700 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Go to home
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
