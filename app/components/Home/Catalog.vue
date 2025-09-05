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
        <h3 class="text-3xl font-semibold text-neutral-900 max-sm:text-xl mb-6">Discover Catalog</h3>
<!--        <p class="mt-2 text-neutral-600 mb-6">Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.</p>-->
      </div>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        <div v-for="(c, i) in categories" :key="c.id" class="group overflow-hidden rounded-2xl">
          <NuxtLink :to="`/products?category_id=${c.id}`" class="aspect-[16/10] overflow-hidden flex flex-col justify-center items-center gap-4 bg-white">
<!--            <i class="pi pi-image text-4xl text-gray-300"/>-->
<!--            <span class="text-sm text-gray-300">not photo</span>-->
            <img v-if="i === 0" src="@/assets/images/catalog.png" class="h-full w-full object-cover transition group-hover:scale-105" />
            <img v-if="i === 1" src="@/assets/images/catalog-1.png" class="h-full w-full object-cover transition group-hover:scale-105" />
            <img v-if="i === 2" src="@/assets/images/catalog-2.png" class="h-full w-full object-cover transition group-hover:scale-105" />
            <img v-if="i === 3" src="@/assets/images/catalog-3.png" class="h-full w-full object-cover transition group-hover:scale-105" />
            <img v-if="i === 4" src="@/assets/images/catalog-4.png" class="h-full w-full object-cover transition group-hover:scale-105" />
            <img v-if="i === 5" src="@/assets/images/catalog-5.png" class="h-full w-full object-cover transition group-hover:scale-105" />
          </NuxtLink>
          <div class="p-4">
            <p class="text-lg font-bold text-neutral-900 text-center">{{ c.name }}</p>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
<!--        <router-link :to="{name: 'categories'}">-->
<!--          <button class="rounded-xl px-12 py-3 text-black border border-[#868686] border-solid">Show all catalog</button>-->
<!--        </router-link>-->
      </div>
    </div>
  </section>
</template>