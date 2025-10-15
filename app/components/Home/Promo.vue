<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue"
import {axiosInstance} from "~/configs/axios";
import {onMounted} from "vue";
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
  <section class="h-[950px] max-lg:h-[600px]">
    <Swiper v-if="banners?.length"
            :effect="'fade'"
            :pagination="{
      clickable: true
            }"
            :modules="modules"
            :autoplay="{
      delay: 7000,
      disableOnInteraction: false,
    }"
            @swiper="(s) => (swiperInstance = s)"
            class="swiper-banner h-[950px] max-lg:h-[600px]">
      <div class="container absolute m-auto left-0 right-0 z-[20] bottom-[80px] flex justify-end max-lg:hidden">
        <div class="flex gap-4">
          <button class="text-white cursor-pointer" @click="prevSlide">
            <i class="pi pi-arrow-left text-2xl"></i>
          </button>
          <button class="text-white cursor-pointer" @click="nextSlide">
            <i class="pi pi-arrow-right text-2xl"></i>
          </button>
        </div>
      </div>
      <SwiperSlide v-for="(banner, i) in banners"
                   :key="i">
        <div class="w-full h-full relative">
          <div class="bg-black/25 absolute left-0 top-0 w-full h-full"></div>
          <div class="container absolute left-0 top-[250px] right-0 m-auto">
            <h1 class="text-3xl sm:text-5xl md:text-5xl font-bold text-white whitespace-pre-line leading-tight max-sm:text-xl mb-10">
              {{ banner.title }}
            </h1>
            <div class="flex gap-3 pt-10" v-if="banner?.link_url">
              <nuxt-link :to="banner?.link_url">
                <button class="rounded-xl px-16 py-4 border border-white border-solid text-white max-md:text-xs max-lg:text-sm max-md:px-10">Show now</button>
              </nuxt-link>
            </div>
          </div>
          <SetImage v-if="banner?.image_url"
                    class="w-full h-full object-cover"
                    :image-url="banner?.image_url.slice(1)"/>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
<style lang="css">
.swiper-banner .swiper-pagination-bullet {
  width: 15px;
  height: 15px;
  background: #454148;
  opacity: 1;
}

@media (max-width: 800px) {
  .swiper-banner .swiper-pagination {
    margin: 0 20px 20px !important;
  }
  .swiper-banner .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}

.swiper-banner .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #FFFFFF;
}

.swiper-banner .swiper-pagination {
  width: 1200px !important;
  right: 0;
  margin: 0 auto 80px;
  display: flex;
  z-index: 1;
  justify-content: flex-start;
}
</style>