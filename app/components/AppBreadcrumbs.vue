<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm text-neutral-500 mb-8 max-md:text-xs overflow-x-auto whitespace-nowrap no-scrollbar py-1">
    <div class="flex items-center shrink-0">
      <nuxt-link to="/" class="hover:text-primary transition-colors duration-200 flex items-center">
        <i class="pi pi-home mr-2 text-[12px]"></i>
        <span>Home</span>
      </nuxt-link>
    </div>
    
    <template v-for="(item, index) in items" :key="index">
      <div class="flex items-center shrink-0">
        <i class="pi pi-angle-right text-[10px] mx-1 text-neutral-300"></i>
        <nuxt-link 
          v-if="item.to" 
          :to="item.to" 
          class="hover:text-primary transition-colors duration-200"
        >
          {{ item.label }}
        </nuxt-link>
        <span v-else class="text-neutral-900 font-semibold">
          {{ item.label }}
        </span>
      </div>
    </template>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
