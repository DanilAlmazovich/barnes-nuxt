<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {axiosInstance} from "@/configs/axios.ts";
import SetImage from "@/components/SetImage.vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';

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

const getProduct = async () => {
  try {
    const response = await axiosInstance.get(`/products/products/${route.params.id}`)
    product.value = response.data
  } catch (e) {
    console.log(e)
  } finally {

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
    <nav class="text-sm text-gray-500 mb-8 flex items-center space-x-2 max-md:text-xs">
      <NuxtLink to="/">
        <span class="cursor-pointer hover:text-gray-800">Home</span>
      </NuxtLink>
      <i class="pi pi-angle-right"></i>
      <NuxtLink to="/products">
        <span class="cursor-pointer hover:text-gray-800 max-md:text-xs">Products</span>
      </NuxtLink>
      <i class="pi pi-angle-right"></i>
      <span class="text-gray-800 font-medium max-md:text-xs">{{ product?.title }}</span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Side (Images) -->
      <div>
        <div class="mb-10">
          <template v-if="product?.images.length">
            <template v-for="(image, i) in product.images" :key="i">
              <template v-if="i === selectedImage">
                <div class="w-full h-[500px] rounded-lg overflow-hidden p-8">
                  <SetImage class="w-full h-full object-contain "
                            :image-url="image"
                            :title="product.title"/>
                </div>
              </template>
            </template>
          </template>
        </div>
        <div class="pt-4">
          <template v-if="product?.images.length">
            <Swiper :space-between="20"
                    :slides-per-view="3">
              <template v-for="(image, index) in product.images" :key="index">
                <SwiperSlide>
                  <div class="w-36 h-36 rounded cursor-pointer hover:shadow border"
                       :class="index === selectedImage ? 'border-gray-400' : 'border-transparent'"
                       @click="selectImage(index)">
                    <SetImage class="w-full h-full object-contain" :image-url="image"/>
                  </div>
                </SwiperSlide>
              </template>
            </Swiper>
          </template>
        </div>
      </div>

      <div>
        <h1 class="text-2xl font-bold mb-2"
            v-if="product?.title">
          {{ product?.title }}
        </h1>
        <p class="text-gray-500 mb-4">
          {{ product?.description }}
        </p>

        <div class="flex items-center mb-6">
          <span class="font-medium mr-2">Category: {{ product?.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>