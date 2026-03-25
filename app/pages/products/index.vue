<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {Button, Paginator, Skeleton, Drawer} from "primevue";
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
  <div class="bg-neutral-50 py-10 flex-1 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Breadcrumbs -->
      <nav class="flex items-center space-x-3 text-sm text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <nuxt-link to="/" class="hover:text-primary transition-colors">Home</nuxt-link>
        <i class="pi pi-angle-right text-[10px]"></i>
        <span class="text-neutral-900 font-medium">Products</span>
      </nav>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-neutral-900">Our Products</h1>
        <div class="hidden max-xxl:block">
          <Button 
            icon="pi pi-filter" 
            label="Filters" 
            outlined 
            severity="secondary"
            @click.prevent="visible = !visible"
            class="rounded-xl"
          />
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8 items-start">
        <!-- Sidebar Filters -->
        <aside class="col-span-3 max-xxl:hidden sticky top-24">
          <ProductsFilter />
        </aside>

        <!-- Product Grid -->
        <main class="col-span-9 max-xxl:col-span-12">
          <div 
            v-if="products?.length && !getProductsLoading"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <NuxtLink 
              v-for="product in products" 
              :key="product.id"
              :to="`/products/${product.id}`"
              class="group flex w-full"
            >
              <div
                class="bg-white rounded-2xl shadow-sm hover:shadow-2xl p-6 flex flex-col items-center text-center justify-between w-full min-h-[380px] transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100"
              >
                <div class="flex flex-col items-center w-full">
                  <div class="overflow-hidden w-full mb-6 rounded-xl">
                    <SetImage 
                      :image-url="product.images[0]" 
                      class="h-48 w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 class="font-bold text-neutral-800 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {{ product.title }}
                  </h3>
                  <p class="text-neutral-500 text-sm mb-4 line-clamp-2">
                    {{ product.category }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Loading State -->
          <div v-if="getProductsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 9" :key="n" class="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
              <Skeleton height="200px" width="100%" borderRadius="1rem" />
              <Skeleton width="60%" height="1.5rem" />
              <Skeleton width="40%" />
              <div class="flex justify-between items-center pt-4">
                <Skeleton width="30%" height="2rem" />
                <Skeleton shape="circle" size="3rem" />
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!products?.length && !getProductsLoading" class="bg-white rounded-2xl p-12 text-center border border-dashed border-neutral-300">
            <div class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <i class="pi pi-search text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">No products found</h3>
            <p class="text-neutral-500 mb-6">Try adjusting your filters or search criteria.</p>
            <Button label="Clear all filters" @click="router.push('/products')" outlined />
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-12 mb-10" v-if="meta && products?.length && meta.total_pages > 1">
            <Paginator 
              :first="(meta?.current_page - 1) * meta?.per_page"
              :rows="meta?.per_page"
              :totalRecords="meta?.total"
              @page="selectPage"
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            />
          </div>
        </main>
      </div>
    </div>
  </div>

  <!-- Mobile Filters Drawer -->
  <Drawer position="right" v-model:visible="visible" header="Filters" class="!w-[350px] max-sm:!w-full">
    <div class="px-2">
      <ProductsFilter />
    </div>
  </Drawer>
</template>

<style lang="css">
.p-paginator {
  background: transparent !important;
  border: none !important;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  border-radius: 12px;
  background: white;
  color: #1E1E1E;
  margin: 0 4px;
  border: 1px solid #E5E5E5;
  transition: all 0.3s ease;
}

.p-paginator .p-paginator-pages .p-paginator-page:hover {
  border-color: #263D87;
  color: #263D87;
}

.p-paginator .p-paginator-pages .p-paginator-page.p-paginator-page-selected {
  background: #263D87;
  color: #fff;
  border-color: #263D87;
  box-shadow: 0 4px 12px rgba(38, 61, 135, 0.2);
}

.p-drawer-right {
  z-index: 2002 !important;
}
</style>