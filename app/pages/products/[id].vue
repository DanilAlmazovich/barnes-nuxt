<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {axiosInstance} from "@/configs/axios.ts";
import SetImage from "@/components/SetImage.vue";
import {Skeleton} from "primevue";

import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation, FreeMode} from "swiper/modules"
const modules = [Pagination, Navigation, FreeMode]

const route = useRoute()

interface ProductModel {
  title: string
  description: string
  id: number
  images: string[]
  price: number
  category: string
}

const product = ref<ProductModel | null>(null)
const loading = ref(true)

const getProduct = async () => {
  loading.value = true
  try {
    const response = await axiosInstance.get(`/products/products/${route.params.id}`)
    product.value = response.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getProduct()
})

const selectedImage = ref(0)
const selectImage = (id: number) => {
  selectedImage.value = id
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto px-6 py-14 mb-10">
    <!-- Breadcrumbs -->
    <nav class="text-sm text-neutral-500 mb-8 flex items-center space-x-2 max-md:text-xs min-h-[20px]">
      <NuxtLink to="/" class="hover:text-neutral-800 transition-colors">Home</NuxtLink>
      <i class="pi pi-angle-right"></i>
      <NuxtLink to="/products" class="hover:text-neutral-800 transition-colors">Products</NuxtLink>
      <template v-if="!loading && product">
        <i class="pi pi-angle-right"></i>
        <span class="text-neutral-800 font-medium truncate max-w-[200px]">{{ product.title }}</span>
      </template>
    </nav>

    <div class="grid grid-cols-2 max-xl:grid-cols-1 gap-12">
      <!-- Left Side (Gallery) -->
      <div class="w-full">
        <!-- Main Image Skeleton / Content -->
        <div class="relative bg-white border border-neutral-100 rounded-3xl p-6 md:p-10 mb-6 flex items-center justify-center h-[400px] md:h-[550px] overflow-hidden shadow-sm">
          <template v-if="!loading && product?.images?.length">
            <Transition name="fade" mode="out-in">
              <div :key="selectedImage" class="w-full h-full flex items-center justify-center">
                <SetImage 
                  class="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
                  :image-url="product.images[selectedImage]"
                  :title="product.title"
                />
              </div>
            </Transition>
          </template>
          <Skeleton v-else width="100%" height="100%" borderRadius="1.5rem" />
        </div>

        <!-- Thumbnails Skeleton / Slider -->
        <div class="w-full pt-2 min-h-[144px]">
          <template v-if="!loading && product?.images?.length && product.images.length > 1">
            <ClientOnly>
              <Swiper 
                :space-between="16"
                :modules="modules"
                :slidesPerView="'auto'"
                :freeMode="true"
                class="thumbs-swiper !pb-4"
              >
                <SwiperSlide v-for="(image, index) in product.images" :key="index" class="!w-24 md:!w-32">
                  <div 
                    class="aspect-square rounded-2xl cursor-pointer transition-all duration-300 border-2 overflow-hidden bg-white p-2"
                    :class="index === selectedImage ? 'border-primary shadow-md scale-95' : 'border-neutral-100 opacity-60 hover:opacity-100 hover:border-neutral-300'"
                    @click="selectImage(index)"
                  >
                    <SetImage class="w-full h-full object-contain" :image-url="image"/>
                  </div>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </template>
          <div v-else-if="loading" class="flex gap-4">
             <Skeleton v-for="n in 3" :key="n" width="128px" height="128px" borderRadius="1rem" />
          </div>
        </div>
      </div>

      <!-- Right Side (Info) -->
      <div class="space-y-6">
        <template v-if="!loading && product">
          <div>
            <span class="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              {{ product.category }}
            </span>
            <h1 class="text-3xl font-bold text-neutral-900 leading-tight">
              {{ product.title }}
            </h1>
          </div>

          <div class="text-3xl font-bold text-primary">
            ${{ product.price }}
          </div>

          <div class="space-y-4 pt-4 border-t border-neutral-100">
            <h3 class="text-sm font-bold text-neutral-900 uppercase tracking-widest">Description</h3>
            <p class="text-neutral-600 leading-relaxed">
              {{ product.description }}
            </p>
          </div>
        </template>
        
        <template v-else>
          <div class="space-y-6">
            <Skeleton width="120px" height="2rem" borderRadius="1rem" />
            <Skeleton width="90%" height="3.5rem" />
            <Skeleton width="40%" height="2.5rem" />
            <div class="space-y-3 py-6 border-t border-neutral-100">
              <Skeleton width="100px" height="1rem" />
              <div class="space-y-2">
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="70%" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.thumbs-swiper :deep(.swiper-slide) {
  height: auto;
}
</style>