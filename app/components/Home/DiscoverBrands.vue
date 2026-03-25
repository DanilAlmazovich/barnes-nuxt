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

interface MetaModel {
  current_page: number
  last_page: number
  per_page: number
  total: number
  total_pages: number
}

const products = ref<ProductModel[]>([])
const meta = ref<MetaModel | null>(null)
const getProductsLoading = ref<boolean>(false)

const getProducts = async () => {
  getProductsLoading.value = true
  try {
    const response = await axiosInstance.get("/products/products", {params: {per_page: 10}})
    products.value = response.data.data
    meta.value = response.data.meta
    window.scrollTo({top: 0, behavior: "smooth"});
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
  <section class="py-20 bg-[#F2F2F4]">
    <div class="max-w-[1200px] mx-auto px-4">
      <!-- Header with Navigation Buttons -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-3xl font-semibold max-sm:text-xl" v-scroll-reveal>Discover Products</h2>
        <div class="flex gap-3">
          <button 
            @click="prevSlide" 
            class="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary transition-all duration-300 active:scale-90"
            aria-label="Previous slide"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-white hover:border-primary hover:text-primary transition-all duration-300 active:scale-90"
            aria-label="Next slide"
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
      </div>

      <ClientOnly>
        <Swiper 
          :slidesPerView="'auto'"
          :loop="true"
          :modules="modules"
          class="swiper-brands"
          :autoplay="{
            delay: 8000,
            disableOnInteraction: false,
          }"
          :space-between="30"
          @swiper="onSwiper"
        >
          <template v-if="products?.length && !getProductsLoading">
            <SwiperSlide v-for="product in products" :key="product.id" class="h-full py-4 !w-[300px]">
              <NuxtLink class="flex w-full h-full group" :to="`/products/${product.id}`">
                <div
                    class="bg-white rounded-2xl shadow-sm hover:shadow-2xl p-6 flex flex-col items-center text-center justify-between w-full min-h-[400px] transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100">
                  <div class="flex flex-col items-center w-full">
                    <div class="overflow-hidden w-full mb-6 rounded-xl">
                       <SetImage :image-url="product.images[0]" class="h-48 w-full object-contain transition-transform duration-700 group-hover:scale-110"/>
                    </div>
                    <h3 class="font-bold text-neutral-800 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">{{ product.title }}</h3>
                    <p class="text-neutral-500 text-sm mb-4 line-clamp-3">{{ product.category }}</p>
                  </div>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </template>
          
          <template v-if="getProductsLoading">
             <SwiperSlide v-for="n in 5" :key="n" class="!w-[300px]">
               <Skeleton height="400px" width="100%" borderRadius="1rem" />
             </SwiperSlide>
          </template>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="css">
.swiper-brands .swiper-wrapper {
  padding-bottom: 20px;
}
</style>