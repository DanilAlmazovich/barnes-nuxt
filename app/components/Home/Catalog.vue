<script setup lang="ts">
import {onMounted, ref} from "vue";
import {axiosInstance} from "@/configs/axios.ts";

interface CategoryModel {
  id: number
  name: string
}

const categories = ref<CategoryModel[]>([])

const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories/categories`, {params: {per_page: 6}})
    categories.value = response.data.data
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <section class="bg-[#F2F2F4] py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h3 class="text-3xl font-semibold text-neutral-900 max-sm:text-xl mb-6" v-scroll-reveal>Discover Catalog</h3>
      </div>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        <div v-for="(c, i) in categories" :key="c.id" 
             v-scroll-reveal="{ threshold: 0.1 }"
             class="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
          <NuxtLink :to="`/products?category_id=${c.id}`" class="aspect-[16/10] overflow-hidden flex flex-col justify-center items-center gap-4 bg-white relative">
            <!-- Overlay effect on hover -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
            
            <img v-if="i === 0" src="@/assets/images/catalog.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <img v-if="i === 1" src="@/assets/images/catalog-1.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <img v-if="i === 2" src="@/assets/images/catalog-2.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <img v-if="i === 3" src="@/assets/images/catalog-3.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <img v-if="i === 4" src="@/assets/images/catalog-4.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <img v-if="i === 5" src="@/assets/images/catalog-5.png" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </NuxtLink>
          <div class="px-4 py-6 relative z-20 bg-white">
            <p class="text-xl font-bold text-neutral-900 text-center group-hover:text-primary transition-colors duration-300">{{ c.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>