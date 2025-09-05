<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {Button, Paginator, Skeleton, Drawer} from "primevue";
import axios from "axios";
import SetImage from "@/components/SetImage.vue"
import {useRoute, useRouter} from "vue-router";
import {axiosInstance} from "~/configs/axios";

const router = useRouter()
const route = useRoute()

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
    const response = await axiosInstance.get("/products/products", {params: {...route.query, per_page: 30}})
    products.value = response.data.data
    meta.value = response.data.meta
    window.scrollTo({top: 0, behavior: "smooth"});
  } catch (e) {
    console.log(e)
  } finally {
    getProductsLoading.value = false
  }
}

const selectPage = ({page}: { page: number }) => {
  router.push({name: 'products', query: {...route.query, page: page > 0 ? page + 1 : undefined}})
}

watch(() => route.query, () => {
  getProducts()
  visible.value = false
})

onMounted(() => {
  getProducts()
})

const visible = ref(false)
</script>

<template>
  <div class="bg-gray-50 py-6 flex-1 h-full">
    <div class="container px-4">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <nuxt-link to="/">
          <span class="max-md:text-xs">Home</span>
        </nuxt-link>
        <i class="pi pi-angle-right"></i>
        <span class="max-md:text-xs">Products</span>
      </div>
      <div class="hidden max-xxl:flex pb-6 justify-end">
        <Button icon="pi pi-filter"
                text
                @click.prevent="visible = !visible"/>
      </div>
      <div class="grid grid-cols-12 gap-6 max-xl:gap-2 items-start ">
        <ProductsFilter class="max-xxl:hidden"/>
        <main class="col-span-9 max-xxl:col-span-12">
          <div
              class="grid grid-cols-3 gap-6 max-xl:grid-cols-3 max-xl:gap-2 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
            <template v-if="products?.length && !getProductsLoading">
              <template v-for="(product, i) in products" :key="i">
                <NuxtLink class="flex w-full"
                          :to="`/products/${product.id}`">
                  <div
                      class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center justify-between w-full">
                    <div class="flex flex-col mb-2">
                      <SetImage :image-url="product.images[0]" class="h-36 object-contain mb-4"/>
                      <p class="font-medium text-sm mb-2">{{ product.title }}</p>
                    </div>
                  </div>
                </NuxtLink>
              </template>
            </template>
            <template v-if="getProductsLoading">
              <Skeleton height="300px"
                        width="100%"
                        v-for="n in 30"/>
            </template>
          </div>
          <template v-if="!products?.length && !getProductsLoading">
            <Message class="w-full">Empty data</Message>
          </template>
          <div class="flex justify-center mt-6 py-2" v-if="meta && products?.length">
            <Paginator :first="(meta?.current_page - 1) * meta?.per_page"
                       :rows="meta?.per_page"
                       :totalRecords="meta?.total"
                       @page="selectPage"/>
          </div>
        </main>
      </div>
    </div>
  </div>
  <Drawer position="right" v-model:visible="visible" header="filter" class="w-[25rem] max-sm:w-full">
    <div class="py-6">
      <ProductsFilter/>
    </div>
  </Drawer>
</template>
<style lang="css">
.p-paginator .p-paginator-pages .p-paginator-page {
  border-radius: 5px;
  background: white;
  color: #000;
}

@media (min-width: 500px) {
  .p-paginator .p-paginator-pages .p-paginator-page {
    width: 30px;
    height: 30px;
  }
}

.p-paginator .p-paginator-pages .p-paginator-page.p-paginator-page-selected {
  background: #000;
  color: #fff;
}
.p-drawer-right {
  z-index: 2002 !important;
}
</style>