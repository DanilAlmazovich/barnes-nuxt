<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
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
  sku?: string
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
  updatePageLinkSize()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updatePageLinkSize)
  }
})

const visible = ref(false)
const pageLinkSize = ref(5)

const updatePageLinkSize = () => {
  if (typeof window !== 'undefined') {
    pageLinkSize.value = window.innerWidth < 640 ? 3 : 5
  }
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updatePageLinkSize)
  }
})
</script>

<template>
  <div class="bg-neutral-50 py-6 sm:py-10 flex-1 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Breadcrumbs -->
      <AppBreadcrumbs :items="[{ label: 'All Products' }]" />

      <div class="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-neutral-900">Our Products</h1>
        <div class="xl:hidden w-full xs:w-auto">
          <Button 
            icon="pi pi-filter" 
            label="Filters" 
            outlined 
            severity="secondary"
            @click.prevent="visible = !visible"
            class="rounded-xl w-full xs:w-auto"
          />
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8 items-start">
        <!-- Sidebar Filters -->
        <aside class="col-span-3 hidden xl:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pr-2">
          <ProductsFilter />
        </aside>

        <!-- Product Grid -->
        <main class="col-span-12 xl:col-span-9">
          <!-- Pagination Top -->
          <div class="flex justify-start mb-8" v-if="meta && products?.length && meta.total_pages > 1">
            <Paginator 
              :first="(meta?.current_page - 1) * meta?.per_page"
              :rows="meta?.per_page"
              :totalRecords="meta?.total"
              @page="selectPage"
              template="PrevPageLink PageLinks NextPageLink"
              :pageLinkSize="pageLinkSize"
              class="custom-paginator"
            >
                <template #prevpagelinkicon>
                    <i class="pi pi-chevron-left text-sm"></i>
                </template>
                <template #nextpagelinkicon>
                    <i class="pi pi-chevron-right text-sm"></i>
                </template>
            </Paginator>
          </div>

          <div 
            v-if="products?.length && !getProductsLoading"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            <NuxtLink 
              v-for="product in products" 
              :key="product.id"
              :to="`/products/${product.id}`"
              class="group flex w-full"
            >
              <div
                class="bg-white rounded-2xl shadow-sm hover:shadow-2xl p-3 sm:p-4 flex flex-col items-center text-center justify-between w-full min-h-[380px] sm:min-h-[420px] transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100"
              >
                <div class="flex flex-col items-center w-full">
                  <div class="overflow-hidden w-full mb-4 sm:mb-6 flex items-center justify-center">
                    <SetImage 
                      :image-url="product.images[0]" 
                      class="h-48 sm:h-56 w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 class="font-bold text-neutral-800 text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {{ product.title }}
                  </h3>
                  <div class="flex flex-col gap-1">
                    <p v-if="product.sku" class="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        {{ product.sku }}
                    </p>
                    <p class="text-neutral-500 text-xs sm:text-sm line-clamp-2">
                        {{ product.category }}
                    </p>
                  </div>
                </div>

              </div>
            </NuxtLink>
          </div>

          <!-- Loading State -->
          <div v-if="getProductsLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div v-for="n in 6" :key="n" class="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-100 space-y-6 shadow-sm">
              <div class="flex items-center justify-center py-4">
                <Skeleton height="180px" width="100%" borderRadius="1rem" />
              </div>
              <div class="space-y-3">
                <Skeleton width="85%" height="1.25rem" />
                <Skeleton width="45%" height="1rem" />
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!products?.length && !getProductsLoading" class="bg-white rounded-2xl p-8 sm:p-12 text-center border border-dashed border-neutral-300">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <i class="pi pi-search text-2xl sm:text-3xl"></i>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-neutral-900 mb-2">No products found</h3>
            <p class="text-neutral-500 text-sm mb-6">Try adjusting your filters or search criteria.</p>
            <Button label="Clear all filters" @click="router.push('/products')" outlined size="small" />
          </div>

          <!-- Pagination Bottom -->
          <div class="flex justify-start mt-12 mb-20" v-if="meta && products?.length && meta.total_pages > 1">
            <Paginator 
              :first="(meta?.current_page - 1) * meta?.per_page"
              :rows="meta?.per_page"
              :totalRecords="meta?.total"
              @page="selectPage"
              template="PrevPageLink PageLinks NextPageLink"
              :pageLinkSize="pageLinkSize"
              class="custom-paginator"
            >
                <template #prevpagelinkicon>
                    <i class="pi pi-chevron-left text-sm"></i>
                </template>
                <template #nextpagelinkicon>
                    <i class="pi pi-chevron-right text-sm"></i>
                </template>
            </Paginator>
          </div>
        </main>
      </div>
    </div>
  </div>

  <!-- Mobile Filters Drawer -->
  <Drawer position="right" v-model:visible="visible" header="Filters" class="!w-full xs:!w-[350px]">
    <div class="px-2">
      <ProductsFilter />
    </div>
  </Drawer>
</template>

<style lang="css">
.p-paginator {
  background: transparent !important;
  border: none !important;
  gap: 8px !important;
}

@media (max-width: 400px) {
  .p-paginator {
    gap: 4px !important;
  }
}

.p-paginator .p-paginator-pages .p-paginator-page,
.p-paginator .p-paginator-prev,
.p-paginator .p-paginator-next {
  min-width: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
  background: white !important;
  color: #525252 !important;
  margin: 0 2px !important;
  border: 1px solid #E5E5E5 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-weight: 600 !important;
  font-size: 0.9rem !important;
}

@media (max-width: 400px) {
  .p-paginator .p-paginator-pages .p-paginator-page,
  .p-paginator .p-paginator-prev,
  .p-paginator .p-paginator-next {
    min-width: 36px !important;
    height: 36px !important;
    border-radius: 10px !important;
    font-size: 0.8rem !important;
    margin: 0 1px !important;
  }
}

.p-paginator .p-paginator-pages .p-paginator-page:hover {
  border-color: #263D87 !important;
  color: #263D87 !important;
  background: #f8faff !important;
}

.p-paginator .p-paginator-pages .p-paginator-page.p-paginator-page-selected {
  background: #374151 !important;
  color: #fff !important;
  border-color: #374151 !important;
  box-shadow: 0 8px 16px rgba(55, 65, 81, 0.25) !important;
}

.p-paginator .p-paginator-prev:not(.p-disabled):hover,
.p-paginator .p-paginator-next:not(.p-disabled):hover {
    border-color: #374151 !important;
    color: #374151 !important;
    background: #f9fafb !important;
}

.p-paginator .p-paginator-prev.p-disabled,
.p-paginator .p-paginator-next.p-disabled {
    opacity: 0.5 !important;
    background: #f5f5f5 !important;
}

.p-drawer-right {
  z-index: 2002 !important;
}
</style>