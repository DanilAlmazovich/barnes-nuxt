<script setup lang="ts">
import {Skeleton} from "primevue";
import SetImage from "@/components/SetImage.vue";
import {onMounted, ref} from "vue";
import {axiosInstance} from "~/configs/axios";
import {Swiper, SwiperSlide} from "swiper/vue"
import {Pagination, Navigation} from "swiper/modules"
const modules = [Pagination, Navigation]
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
</script>

<template>
  <section class="py-20 bg-[#F2F2F4] test">
    <div class="max-w-[1200px] mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-6 max-sm:text-xl">Discover Brands</h2>
      <ClientOnly>
        <Swiper :slidesPerView="'auto'"
                pagination
                :modules="modules"
                class="swiper-brands"
                :space-between="20">
          <template v-if="products?.length && !getProductsLoading">
            <SwiperSlide v-for="product in products" :key="product.id" class="h-full py-2 !w-[260px]">
              <NuxtLink class="flex w-full h-full" :to="`/products/${product.id}`">
                <div
                  class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center justify-between w-full min-h-[280px]">
                  <div class="flex flex-col mb-2">
                    <SetImage :image-url="product.images[0]" class="h-36 object-contain mb-6"/>
                    <p class="font-medium text-sm mb-2">{{ product.title }}</p>
                  </div>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </template>
          <template v-if="getProductsLoading">
            <div class="grid grid-cols-4 gap-4">
              <Skeleton height="300px"
                        width="100%"
                        v-for="n in 4"/>
            </div>
          </template>
        </Swiper>
      </ClientOnly>
    </div>
  </section>
</template>
<style lang="css">
.swiper-brands .swiper-wrapper {
    padding-bottom: 40px;
}
.swiper-brands .swiper-pagination {
  bottom: 0 !important;
}
</style>