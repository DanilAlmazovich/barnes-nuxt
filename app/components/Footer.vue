<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "~/configs/axios";
import { useToast } from 'primevue/usetoast'

const email = ref<string>('')

const toast = useToast()

const subscribe = async () => {
  try {
    await axiosInstance.post(`/api/v1/subscribe`, {email: email.value})
    email.value = ''
    toast.add({ severity: 'success', summary: 'Subscribed!', life: 3000 })
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <footer class="bg-neutral-900 text-neutral-300 border-t border-white/5">
    <div class="mx-auto container px-6 py-12 md:py-20">
      <div class="flex flex-col lg:flex-row justify-between gap-16">
        <!-- Brand and Newsletter -->
        <div class="max-w-md space-y-10">
          <NuxtLink class="inline-block w-44 md:w-52" to="/">
            <img src="@/assets/images/logo-white.png" alt="The Barnes White Logo" class="w-full h-auto opacity-90 hover:opacity-100 transition-opacity">
          </NuxtLink>
          
          <div class="space-y-5">
            <h4 class="text-white font-bold text-xl tracking-tight">Stay Updated</h4>
            <p class="text-neutral-400 text-base leading-relaxed">Subscribe to get the latest news and equipment updates directly to your inbox.</p>
            <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3">
              <input 
                v-model="email" 
                required 
                type="email" 
                class="flex-1 rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-sm outline-none placeholder-neutral-500 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholder="Email address"
              />
              <button 
                type="submit" 
                class="rounded-xl bg-white px-8 py-3.5 text-neutral-900 font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <!-- Links Navigation -->
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-12 lg:gap-24">
          <div class="space-y-6">
            <h4 class="font-bold text-white uppercase tracking-[0.2em] text-xs opacity-50">Quick Links</h4>
            <ul class="space-y-4 text-base">
              <li><NuxtLink to="/products" class="text-neutral-400 hover:text-white transition-colors duration-200">Products</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-neutral-400 hover:text-white transition-colors duration-200">About Us</NuxtLink></li>
              <li><NuxtLink to="/contacts" class="text-neutral-400 hover:text-white transition-colors duration-200">Contacts</NuxtLink></li>
            </ul>
          </div>
          <div class="space-y-6">
            <h4 class="font-bold text-white uppercase tracking-[0.2em] text-xs opacity-50">Support</h4>
            <ul class="space-y-4 text-base">
              <li><a href="mailto:info@barnesfire.com" class="text-neutral-400 hover:text-white transition-colors duration-200">Support Email</a></li>
              <li><a href="tel:+1234567890" class="text-neutral-400 hover:text-white transition-colors duration-200">Call Center</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/5 pt-10">
        <p class="text-[11px] text-neutral-500 uppercase tracking-[0.2em] text-center">
          Copyright © 2025 THE BARNES FIRE EQUIPMENT · All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>