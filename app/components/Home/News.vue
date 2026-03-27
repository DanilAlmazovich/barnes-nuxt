<script setup lang="ts">
import {computed, ref} from "vue";

const news = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: 'Cairns Black N5A New Yorker',
  date: '19 Dec, 2019',
  img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
}))

const newsIndex = ref(0)
const visibleCount = 5
const visibleNews = computed(() => news.slice(newsIndex.value, newsIndex.value + visibleCount))
</script>

<template>
  <section class="py-12 sm:py-20">
    <div class="mx-auto container px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 max-xs:text-xl" v-scroll-reveal>Latest News</h2>
        <div class="hidden sm:flex gap-3">
          <button class="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors" aria-label="Previous">
            <i class="pi pi-chevron-left text-sm"></i>
          </button>
          <button class="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors" aria-label="Next">
            <i class="pi pi-chevron-right text-sm"></i>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in visibleNews" :key="n.id" class="group rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
          <div class="aspect-[16/10] overflow-hidden">
            <img :src="n.img" :alt="n.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-primary"></span>
              <p class="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{{ n.date }}</p>
            </div>
            <p class="text-base sm:text-lg font-bold text-neutral-900 line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-4">{{ n.title }}</p>
            <div class="mt-auto">
              <button class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                Read More
                <i class="pi pi-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>