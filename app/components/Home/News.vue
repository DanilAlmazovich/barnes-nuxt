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
  <section class="py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-6 flex items-end justify-between">
        <h2 class="text-2xl font-semibold text-neutral-900 max-sm:text-xl">Latest News</h2>
        <div class="hidden sm:flex gap-2">
          <button class="rounded-full border p-2 hover:bg-neutral-100" aria-label="prev"/>
          <button class="rounded-full border p-2 hover:bg-neutral-100" aria-label="next"/>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="n in visibleNews" :key="n.id" class="group rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div class="aspect-[16/10] overflow-hidden">
            <img :src="n.img" :alt="n.title" class="h-full w-full object-cover transition group-hover:scale-105" />
          </div>
          <div class="p-4">
            <p class="text-xs text-neutral-500">{{ n.date }}</p>
            <p class="mt-1 text-sm font-semibold text-neutral-900 line-clamp-2">{{ n.title }}</p>
            <button class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:underline">Show now</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>