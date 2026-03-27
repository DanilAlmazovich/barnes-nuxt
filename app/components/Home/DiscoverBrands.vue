<script setup lang="ts">
import {Skeleton} from "primevue";
import SetImage from "@/components/SetImage.vue";
import {onMounted, ref} from "vue";
import {axiosInstance} from "~/configs/axios";
import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation, Autoplay} from "swiper/modules"

const modules = [Pagination, Navigation, Autoplay]

interface ProductModel {
  id: number
  title: string
  price: number
  category: string
  description: string
  images: string[]
}

const products = ref<ProductModel[]>([])
const getProductsLoading = ref<boolean>(false)

const getProducts = async () => {
  getProductsLoading.value = true
  try {
    const response = await axiosInstance.get("/products/products", {params: {per_page: 12}})
    products.value = response.data.data
  } catch (e) {
    console.log(e)
  } finally {
    getProductsLoading.value = false
  }
}

onMounted(() => {
  getProducts()
})

const swiperRef = ref<any>(null)
const onSwiper = (swiper: any) => {
  swiperRef.value = swiper
}
const nextSlide = () => swiperRef.value?.slideNext()
const prevSlide = () => swiperRef.value?.slidePrev()
</script>

<template>
  <section class="py-16 sm:py-24 bg-neutral-50 overflow-hidden">
    <div class="px-4 xs:px-6 lg:px-12 mb-10 sm:mb-14">
      <div class="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 max-w-[1400px] mx-auto">
        <div class="space-y-2" v-scroll-reveal>
          <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">Our Collection</h2>
          <p class="text-neutral-500 text-sm sm:text-base max-w-md">Discover our latest equipment and professional solutions.</p>
        </div>
        
        <div class="flex gap-2">
          <button 
            @click="prevSlide" 
            class="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 active:scale-95 shadow-sm"
            aria-label="Previous slide"
          >
            <i class="pi pi-arrow-left text-sm"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 active:scale-95 shadow-sm"
            aria-label="Next slide"
          >
            <i class="pi pi-arrow-right text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="pl-4 xs:pl-6 lg:pl-12">
      <ClientOnly>
        <Swiper 
          :slidesPerView="'auto'"
          :loop="products?.length > 4"
          :modules="modules"
          class="swiper-discover !overflow-visible"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :space-between="24"
          @swiper="onSwiper"
          :breakpoints="{
            '320': { slidesPerView: 'auto', spaceBetween: 12 },
            '480': { slidesPerView: 'auto', spaceBetween: 16 },
            '1024': { slidesPerView: 'auto', spaceBetween: 24 }
          }"
        >
          <template v-if="products?.length && !getProductsLoading">
            <SwiperSlide v-for="product in products" :key="product.id" class="!w-[240px] xs:!w-[280px] sm:!w-[340px]">
              <NuxtLink class="flex w-full group" :to="`/products/${product.id}`">
                <div class="flex flex-col w-full">
                  <div class="relative overflow-hidden w-full aspect-[4/5] mb-5 flex items-center justify-center">
                    <SetImage 
                      :image-url="product.images[0]" 
                      class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div class="absolute top-4 left-4">
                       <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-800 shadow-sm border border-white/20">
                         {{ product.category }}
                       </span>
                    </div>
                  </div>
                  <div class="space-y-1 px-1">
                    <h3 class="font-bold text-neutral-900 text-lg group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {{ product.title }}
                    </h3>
                    <p class="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </template>
          
          <template v-if="getProductsLoading">
             <SwiperSlide v-for="n in 5" :key="n" class="!w-[280px] sm:!w-[340px]">
               <div class="flex flex-col w-full space-y-5">
                 <Skeleton width="100%" class="aspect-[4/5]" borderRadius="1.5rem" />
                 <div class="space-y-3 px-1">
                   <Skeleton width="70%" height="1.75rem" borderRadius="0.5rem" />
                   <div class="space-y-2">
                     <Skeleton width="100%" height="1rem" />
                     <Skeleton width="85%" height="1rem" />
                   </div>
                 </div>
               </div>
             </SwiperSlide>
          </template>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="css">
.swiper-discover .swiper-wrapper {
  padding-bottom: 40px;
}
</style>