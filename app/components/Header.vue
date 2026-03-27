<script setup lang="ts">
import {Button, Drawer} from "primevue"
import {onMounted, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router";
import {axiosInstance} from "~/configs/axios";

const route = useRoute()
const router = useRouter()

const visible = ref(false)
const isMenuOpen = ref(false)

watch(() => route.path, () => {
  visible.value = false
  isMenuOpen.value = false
})
watch(() => route.query, () => {
  visible.value = false
  isMenuOpen.value = false
})

const searchValue = ref<string>(route.query.search as string || '')

const search = () => {
  if(searchValue.value.length) {
    router.push({path: '/products', query: { search: searchValue.value }})
  }
}

const clearSearch = () => {
  searchValue.value = ''
  router.push({path: '/products'})
}

interface CategoryModel {
  id: number
  name: string
}

const categories = ref<CategoryModel[]>([])

const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories/categories`, {params: {per_page: 100}})
    categories.value = response.data.data
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <header 
    class="sticky top-0 z-[2000] w-full border-b border-white/10 bg-gray-700/95 backdrop-blur-md"
    @mouseleave="isMenuOpen = false"
  >
    <!-- Top Header -->
    <div class="border-b border-neutral-300 bg-neutral-200 py-2 hidden xl:block">
        <div class="container mx-auto px-4 flex items-center justify-between">
            <div class="flex items-center gap-6 text-xs text-neutral-700 font-semibold">
                <div class="flex items-center gap-2">
                    <i class="pi pi-map-marker text-primary"></i>
                    <span>1135 Okie St, Unit C Washington DC 20002</span>
                </div>
                <a href="tel:+18667227637" class="flex items-center gap-2 hover:text-primary transition-colors">
                    <i class="pi pi-phone text-primary"></i>
                    <span>+1 866-722-7637</span>
                </a>
            </div>
            
            <div class="relative w-64 xxl:w-80">
                <form @submit.prevent="search" class="flex items-center">
                  <input
                      v-model="searchValue"
                      class="w-full rounded-lg bg-white px-4 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-1 focus:ring-primary/50 transition-all border border-neutral-200"
                      placeholder="Search products..."/>
                  <button type="submit" class="absolute right-3 text-neutral-400 hover:text-primary">
                    <i class="pi pi-search text-[10px]"></i>
                  </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Main Header -->
    <div class="mx-auto container px-4 py-3 md:py-4">
      <div class="flex h-12 md:h-14 items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex-shrink-0 w-20 md:w-24 xl:w-28 xxl:w-32">
          <nuxt-link class="flex w-full" to="/">
            <img class="w-full h-auto" src="@/assets/images/logo.svg" alt="The Barnes Logo">
          </nuxt-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden xl:flex items-center gap-8 lg:gap-10 text-sm text-neutral-400 h-full">
          <nuxt-link to="/" class="text-base hover:text-white transition-colors duration-200 uppercase font-medium">Home</nuxt-link>
          <div 
            class="h-full flex items-center"
            @mouseenter="isMenuOpen = true"
          >
            <button 
              class="text-base hover:text-white transition-colors duration-200 uppercase flex items-center gap-1 font-medium"
              :class="{'text-white': isMenuOpen}"
            >
              Products
              <i class="pi pi-angle-down text-xs transition-transform duration-300" :class="{'rotate-180': isMenuOpen}"></i>
            </button>
          </div>
          <nuxt-link to="/about" class="text-base hover:text-white transition-colors duration-200 uppercase font-medium">About us</nuxt-link>
          <nuxt-link to="/contacts" class="text-base hover:text-white transition-colors duration-200 uppercase font-medium">Contacts</nuxt-link>
        </nav>

        <!-- Mobile Actions -->
        <div class="xl:hidden flex items-center gap-2">
          <Button text icon="pi pi-search" class="!text-white !p-2" @click.prevent="visible = !visible" />
          <Button text icon="pi pi-bars" class="!text-white !p-2" @click.prevent="visible = !visible"/>
        </div>
      </div>
    </div>

    <!-- Mega Menu -->
    <transition name="menu-fade">
      <div 
        v-if="isMenuOpen" 
        class="absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-neutral-200 shadow-2xl overflow-hidden"
        @mouseenter="isMenuOpen = true"
      >
        <div class="container mx-auto px-4 py-12 relative">
          <button 
            @click="isMenuOpen = false"
            class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
          >
            <i class="pi pi-times text-xl"></i>
          </button>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-3">
              <nuxt-link 
                to="/products"
                class="text-primary hover:text-primary/80 transition-all duration-300 text-lg py-2 flex items-center hover:translate-x-1 font-extrabold uppercase tracking-tight border-b-2 border-primary/20 mb-2"
              >
                All Products
              </nuxt-link>
              <nuxt-link 
                v-for="category in categories" 
                :key="category.id"
                :to="{ path: '/products', query: { category_ids: category.id } }"
                class="text-neutral-700 hover:text-primary transition-all duration-300 text-sm py-1 flex items-center hover:translate-x-1 font-semibold uppercase tracking-tight"
              >
                {{ category.name }}
              </nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <Drawer v-model:visible="visible" position="right" class="!w-full sm:!w-[350px]">
    <template #header>
       <div class="flex items-center w-20 md:w-24">
          <img src="@/assets/images/logo.svg" alt="Logo" class="w-full filter invert brightness-0">
       </div>
    </template>
    <div class="flex flex-col h-full">
      <div class="mb-8">
        <form @submit.prevent="search" class="relative">
          <input
              v-model="searchValue"
              class="w-full rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search products..."/>
          <button type="submit" class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
            <i class="pi pi-search"></i>
          </button>
        </form>
      </div>
      <nav class="flex flex-col gap-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        <NuxtLink to="/" class="text-lg font-bold text-neutral-900 uppercase tracking-wider">Home</NuxtLink>
        <div>
            <p class="text-lg font-bold text-neutral-900 uppercase tracking-wider mb-4">Products</p>
            <div class="flex flex-col gap-3 pl-4 border-l-2 border-neutral-100">
                <NuxtLink to="/products" class="text-neutral-600 hover:text-primary transition-colors text-sm uppercase font-bold">All Categories</NuxtLink>
                <NuxtLink 
                    v-for="category in categories" 
                    :key="category.id"
                    :to="{ path: '/products', query: { category_ids: category.id } }"
                    class="text-neutral-500 hover:text-primary transition-colors text-sm"
                >
                    {{ category.name }}
                </NuxtLink>
            </div>
        </div>
        <NuxtLink to="/about" class="text-lg font-bold text-neutral-900 uppercase tracking-wider">About us</NuxtLink>
        <NuxtLink to="/contacts" class="text-lg font-bold text-neutral-900 uppercase tracking-wider">Contacts</NuxtLink>
      </nav>
      <div class="mt-auto pt-10 border-t border-neutral-100 text-neutral-400 text-xs">
        <p>© 2026 THE BARNES FIRE EQUIPMENT</p>
      </div>
    </div>
  </Drawer>
</template>
<style>
.p-drawer-top {
  z-index: 3000 !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease-out;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>