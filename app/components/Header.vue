<script setup lang="ts">
import {Button, Drawer} from "primevue"
import {ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const visible = ref(false)

watch(() => route.path, () => {
  visible.value = false
})

const searchValue = ref<string>(route.query.search as string || '')

const search = () => {
  if(searchValue.value.length) {
    router.push(`/products?search=${searchValue.value.length ? searchValue.value : undefined}`)
  }
}
</script>

<template>
  <header class="sticky top-0 z-[2000] w-full border-b border-white/10 bg-gray-700 backdrop-blur">
    <div class="mx-auto container px-4 sm:px-6 lg:px-8 pb-5 pt-6 max-xl:py-2">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-3 max-xxl:w-24 w-36">
          <nuxt-link class="flex w-full" to="/">
            <img class="w-full h-full mb-2" src="@/assets/images/logo.svg" alt="">
          </nuxt-link>
        </div>
        <nav class="flex items-center gap-12 text-sm text-neutral-400 max-xxl:gap-6 max-xl:hidden">
          <nuxt-link to="/products" class="text-lg hover:text-white duration-200 uppercase">Products</nuxt-link>
          <nuxt-link to="/about" class="text-lg hover:text-white duration-200 uppercase">About us</nuxt-link>
          <nuxt-link to="/contacts" class="text-lg hover:text-white duration-200 uppercase">Contact</nuxt-link>
        </nav>
        <div class="flex items-center gap-4 max-xl:hidden">
          <div class="relative hidden sm:block">
            <form @submit.prevent="search">
              <input
                  v-model="searchValue"
                  class="w-60 rounded-[8px] bg-gray-600 px-4 py-2 text-sm text-neutral-200 placeholder-neutral-400 outline-none max-xxl:w-50"
                  placeholder="Search for anything…"/>
              <svg @click.prevent="search"
                   class="absolute right-3 top-2.5 h-4 w-4 text-neutral-400 cursor-pointer"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </form>
          </div>
          <button class="md:hidden rounded-full p-2 text-neutral-200 hover:bg-neutral-800" aria-label="Search">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
        <div class="hidden max-xl:flex">
          <Button text icon="pi pi-bars" class="text-white" size="large" @click.prevent="visible = !visible"/>
        </div>
      </div>
    </div>
  </header>
  <Drawer v-model:visible="visible" position="top" class="h-auto">
    <template #header>
      <div class="flex items-center gap-4">
        <div class="relative w-full">
          <form @submit.prevent="search">
            <input
                v-model="searchValue"
                class="w-60 rounded-[8px] bg-gray-600 px-4 py-2 text-sm text-neutral-200 placeholder-neutral-400 outline-none max-xxl:w-64 "
                placeholder="Search for anything…"/>
            <svg class="absolute right-3 top-2.5 h-4 w-4 text-neutral-400 cursor-pointer"
                 viewBox="0 0 24 24"
                 fill="none"
                 @click.prevent="search"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </form>
        </div>
      </div>
    </template>
    <nav class="flex items-center gap-12 text-sm text-neutral-400 max-xxl:gap-6 py-4">
      <NuxtLink to="/products" class="hover:text-white duration-200 uppercase">Products</NuxtLink>
      <NuxtLink to="/about" class="hover:text-white duration-200 uppercase">About us</NuxtLink>
      <NuxtLink to="/contacts" class="hover:text-white duration-200 uppercase">Contact</NuxtLink>
    </nav>
  </Drawer>
</template>
<style>
.p-drawer-top {
  z-index: 3000 !important;
}
</style>