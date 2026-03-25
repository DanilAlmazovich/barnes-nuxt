<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue"
import {axiosInstance} from "~/configs/axios";
import {onMounted, ref} from "vue";
import 'swiper/css/effect-fade';

import {Pagination, Navigation, Autoplay, EffectFade} from "swiper/modules"

const modules = [Pagination, Navigation, Autoplay, EffectFade]

interface BannerModel {
  image_url: string
  display_order: number
  id: number
  is_active: boolean
  link_url: string
  title: string
}

const banners = ref<BannerModel[] | []>([])


const getBannersLoading = ref<boolean>(false)
const getBanners = async () => {
  getBannersLoading.value = true
  try {
    const response = await axiosInstance.get(`/api/v1/banners`)
    banners.value = response.data ?? []
  } catch (e) {
    console.log(e)
  } finally {
    getBannersLoading.value = false
  }
}

onMounted(() => {
  getBanners()
})

const swiperInstance = ref<any>(null)
const nextSlide = () => {
  swiperInstance.value?.slideNext()
}
const prevSlide = () => {
  swiperInstance.value?.slidePrev()
}
</script>

<template>
  <section class="h-[550px] max-xl:h-[calc(100vh-81px)] bg-neutral-900">
    <ClientOnly>
      <Swiper v-if="banners?.length"
              loop
              :effect="'fade'"
              :pagination="{
                clickable: true
              }"
              :navigation="false"
              :modules="modules"
              :autoplay="{
                delay: 7000,
                disableOnInteraction: false,
              }"
              @swiper="(s) => (swiperInstance = s)"
              class="swiper-banner h-[550px]">
        <div class="container absolute m-auto left-0 right-0 z-[20] bottom-[80px] flex justify-end max-lg:hidden">
          <div class="flex gap-4">
            <button class="text-white cursor-pointer hover:text-primary transition-colors" @click="prevSlide">
              <i class="pi pi-arrow-left text-2xl"></i>
            </button>
            <button class="text-white cursor-pointer hover:text-primary transition-colors" @click="nextSlide">
              <i class="pi pi-arrow-right text-2xl"></i>
            </button>
          </div>
        </div>
        <SwiperSlide v-for="(banner, i) in banners"
                     :key="i"
                     v-slot="{ isActive }">
          <div class="w-full h-full relative overflow-hidden">
            <div class="bg-black/40 absolute left-0 top-0 w-full h-full z-10 transition-opacity duration-1000"></div>
            
            <!-- Content Animation -->
            <div class="container absolute left-0 top-0 bottom-0 right-0 m-auto flex flex-col justify-center z-20">
              <div :class="[
                  'transition-all duration-1000 delay-300 transform',
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              ]">
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold text-white whitespace-pre-line leading-tight max-sm:text-2xl mb-8 w-full md:w-3/4 drop-shadow-lg">
                  {{ banner.title }}
                </h1>
                <div class="flex gap-4" v-if="banner?.link_url">
                  <nuxt-link :to="banner?.link_url" class="group">
                    <button class="rounded-xl px-12 py-4 bg-white text-black font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                      Shop Now
                    </button>
                  </nuxt-link>
                </div>
              </div>
            </div>

            <!-- Background Image with Ken Burns -->
            <div :class="[
                'w-full h-full transition-transform duration-[10000ms] ease-linear',
                isActive ? 'scale-110' : 'scale-100'
            ]">
              <SetImage v-if="banner?.image_url"
                        class="w-full h-full object-cover"
                        :image-url="banner?.image_url.slice(1)"/>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div v-else-if="getBannersLoading" class="w-full h-full flex items-center justify-center bg-neutral-800">
         <i class="pi pi-spin pi-spinner text-white text-4xl"></i>
      </div>
    </ClientOnly>
  </section>
</template>

<style lang="css">
.swiper-banner .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
  transition: all 0.3s ease;
}

.swiper-banner .swiper-pagination-bullet-active {
  background: #FFFFFF !important;
  width: 30px !important;
  border-radius: 6px !important;
}

@media (max-width: 800px) {
  .swiper-banner .swiper-pagination {
    margin: 0 20px 20px !important;
    justify-content: center !important;
  }
}

.swiper-banner .swiper-pagination {
  width: 100% !important;
  max-width: 1200px !important;
  left: 0 !important;
  right: 0 !important;
  margin: 0 auto 80px;
  display: flex;
  z-index: 30;
  justify-content: flex-start;
}
</style>