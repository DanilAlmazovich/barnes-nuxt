<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {axiosInstance} from "@/configs/axios.ts";
import SetImage from "@/components/SetImage.vue";
import {Skeleton, Button} from "primevue";

import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation, FreeMode} from "swiper/modules"
const modules = [Pagination, Navigation, FreeMode]

const route = useRoute()
const router = useRouter()

interface ProductModel {
  title: string
  description: string
  id: number
  images: string[]
  price: number
  category: string
  sku?: string
}

const product = ref<ProductModel | null>(null)
const loading = ref(true)
const error = ref(false)

const getProduct = async () => {
  loading.value = true
  error.value = false
  try {
    const response = await axiosInstance.get(`/products/products/${route.params.id}`)
    product.value = response.data
  } catch (e) {
    console.log(e)
    error.value = true
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
  <div class="max-w-[1200px] mx-auto px-6 py-14 mb-10 min-h-[80vh] w-full">
    <!-- Breadcrumbs -->
    <AppBreadcrumbs :items="[
      { label: 'Products', to: '/products' },
      { label: product?.title || (error ? 'Error' : 'Loading...') }
    ]" />

    <div v-if="error" class="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-primary">
        <i class="pi pi-exclamation-circle text-4xl"></i>
      </div>
      <div class="space-y-2">
        <h2 class="text-2xl font-bold text-neutral-900">Something went wrong</h2>
        <p class="text-neutral-500 max-w-sm">We couldn't load the product information. Please try again later or contact support.</p>
      </div>
      <Button label="Go to home" outlined @click="router.push('/')" class="!rounded-xl !px-10 !py-3 !text-sm !font-bold !uppercase !tracking-widest !text-neutral-900 !border-neutral-200 hover:!bg-neutral-50 transition-all active:scale-95 shadow-sm" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
      <!-- Left Side (Gallery) -->
      <div class="w-full">
        <!-- Main Image Skeleton / Content -->
        <div class="relative flex items-center justify-center h-[320px] xs:h-[400px] md:h-[550px] overflow-hidden mb-4 xs:mb-6 bg-white rounded-2xl xs:rounded-[2rem] border border-neutral-100 shadow-sm">
          <template v-if="!loading">
            <template v-if="product?.images?.length">
              <Transition name="fade" mode="out-in">
                <div :key="selectedImage" class="w-full h-full flex items-center justify-center p-6 xs:p-8">
                  <SetImage 
                    class="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
                    :image-url="product.images[selectedImage]"
                    :title="product.title"
                  />
                </div>
              </Transition>
            </template>
            <div v-else class="flex flex-col items-center justify-center text-neutral-300 space-y-4">
              <i class="pi pi-image text-5xl xs:text-6xl"></i>
              <span class="text-xs font-bold uppercase tracking-widest">No image available</span>
            </div>
          </template>
          <Skeleton v-else width="100%" height="100%" borderRadius="2rem" />
        </div>

        <!-- Thumbnails Skeleton / Slider -->
        <div class="w-full pt-2 min-h-[100px] xs:min-h-[144px]">
          <template v-if="!loading && product?.images?.length && product.images.length > 1">
            <ClientOnly>
              <Swiper 
                :space-between="12"
                :modules="modules"
                :slidesPerView="'auto'"
                :freeMode="true"
                class="thumbs-swiper !pb-4"
              >
                <SwiperSlide v-for="(image, index) in product.images" :key="index" class="!w-20 xs:!w-24 md:!w-32">
                  <div 
                    class="aspect-square rounded-xl xs:rounded-2xl cursor-pointer transition-all duration-300 border-2 overflow-hidden bg-white"
                    :class="index === selectedImage ? 'border-primary shadow-md scale-95' : 'border-neutral-100 opacity-60 hover:opacity-100 hover:border-neutral-300'"
                    @click="selectImage(index)"
                  >
                    <SetImage class="w-full h-full object-contain p-2" :image-url="image"/>
                  </div>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </template>
          <div v-else-if="loading" class="flex gap-3 xs:gap-4">
             <Skeleton v-for="n in 3" :key="n" class="!w-20 xs:!w-24 md:!w-32 aspect-square" borderRadius="1rem" />
          </div>
        </div>
      </div>

      <!-- Right Side (Info) -->
      <div class="w-full space-y-6 xs:space-y-8">
        <template v-if="!loading && product">
          <div class="space-y-3 xs:space-y-4">
            <div class="flex flex-wrap items-center gap-2 xs:gap-3 mb-2">
                <span class="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] xs:text-xs font-bold uppercase tracking-widest">
                  {{ product.category }}
                </span>
                <span v-if="product.sku" class="inline-block px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[10px] xs:text-xs font-bold uppercase tracking-widest border border-neutral-200">
                  {{ product.sku }}
                </span>
            </div>
            <h1 class="text-2xl xs:text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
              {{ product.title }}
            </h1>
          </div>

          <div class="space-y-4 xs:space-y-6 pt-6 xs:pt-8 border-t border-neutral-100">
            <h3 class="text-xs font-bold text-neutral-900 uppercase tracking-widest">Description</h3>
            <p class="text-neutral-600 leading-relaxed text-base xs:text-lg">
              {{ product.description }}
            </p>
          </div>
        </template>
        
        <template v-else>
          <div class="space-y-8">
            <div class="space-y-4">
              <Skeleton width="120px" height="2rem" borderRadius="1rem" />
              <Skeleton width="100%" height="3.5rem" />
              <Skeleton width="60%" height="3.5rem" />
            </div>
            <div class="space-y-4 pt-8 border-t border-neutral-100">
              <Skeleton width="140px" height="1.5rem" />
              <div class="space-y-3">
                <Skeleton width="100%" height="1.25rem" />
                <Skeleton width="100%" height="1.25rem" />
                <Skeleton width="80%" height="1.25rem" />
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