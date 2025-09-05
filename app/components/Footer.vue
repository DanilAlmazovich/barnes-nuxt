<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "~/configs/axios";
import { useToast } from 'primevue/usetoast'

const email = ref<string>('')

const toast = useToast()

const subscribe = async () => {
  try {
    await axiosInstance.post(`/feedback/add`, {email: email.value})
    email.value = ''
    toast.add({ severity: 'success', summary: 'Subscribed!', life: 3000 })
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <footer class="bg-gray-700 text-neutral-300">
    <div class="mx-auto container px-4 sm:px-6 lg:px-8 py-6">
      <div
          class="grid grid-cols-[1fr_1fr] gap-10 max-xl:grid-cols-[2fr_1fr] max-lg:grid-cols-[2fr_1fr] max-md:grid-cols-1">
        <div class="space-y-4">
          <div class="flex gap-2 pb-4 items-end">
            <div class="flex items-center gap-3">
              <NuxtLink class="flex w-40" to="/">
                <img src="@/assets/images/logo-white.png" alt="">
              </NuxtLink>
            </div>
            <!--            <p class="text-sm text-neutral-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam diam-->
            <!--              varius tellus imperdiet.</p>-->
          </div>
          <form @submit.prevent="subscribe">
            <div class="flex gap-2">
              <input v-model="email" required type="email" class="w-full rounded-xl bg-neutral-800 px-3 py-2 text-sm outline-none placeholder-neutral-500"
                     placeholder="Enter your email"/>
              <input type="submit" class="rounded-xl bg-white px-4 py-2 text-neutral-900"
                     value="Subscribe">
            </div>
          </form>
      </div>
      <div class="flex justify-end max-md:justify-start">
        <div>
          <h4 class="mb-3 font-semibold text-white">Services</h4>
          <ul class="space-y-2 text-sm text-neutral-400 max-md:flex max-md:gap-x-6 max-md:flex-wrap">
            <li>
              <a href="#" class="text-neutral-400 hover:text-neutral-100 block">
                Request a Quote
              </a>
            </li>
            <li>
              <a href="#" class="text-neutral-400 hover:text-neutral-100 block">
                Service Department
              </a>
            </li>
            <li>
              <a href="#" class="text-neutral-400 hover:text-neutral-100 block">
                Find a Sales Rep
              </a>
            </li>
            <li>
              <a href="#" class="text-neutral-400 hover:text-neutral-100 block">
                Federal Government Sales
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
        class="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500">
      <p>Copyright © 2025 THE BARNES · All Rights Reserved</p>
      <div class="flex items-center gap-4">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Cookies</span>
      </div>
    </div>
    </div>
  </footer>
</template>