<script setup lang="ts">
import {Checkbox} from "primevue";
import {onMounted, ref, watch} from "vue";
import {axiosInstance} from "~/configs/axios";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

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

const selectedCategories = ref<number[]>([])

onMounted(() => {
  getCategories()
  if (route.query.category_id) {
    const ids = Array.isArray(route.query.category_id) 
      ? route.query.category_id.map(Number) 
      : [Number(route.query.category_id)]
    selectedCategories.value = ids
  }
})

watch(selectedCategories, (newVal) => {
  const query = { ...route.query }
  if (newVal.length > 0) {
    query.category_id = newVal.map(String)
  } else {
    delete query.category_id
  }
  router.push({ name: 'products', query })
})

// Sync with route changes (e.g. from outside the component)
watch(() => route.query.category_id, (newVal) => {
  if (!newVal) {
    selectedCategories.value = []
    return
  }
  const ids = Array.isArray(newVal) ? newVal.map(Number) : [Number(newVal)]
  if (JSON.stringify(ids.sort()) !== JSON.stringify([...selectedCategories.value].sort())) {
    selectedCategories.value = ids
  }
})
</script>

<template>
  <aside class="w-full bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-bold text-xl text-neutral-900">Filters</h3>
      <button 
        v-if="selectedCategories.length > 0"
        @click="selectedCategories = []"
        class="text-sm text-primary hover:underline font-medium"
      >
        Reset
      </button>
    </div>

    <div class="space-y-6">
      <!-- Categories Section -->
      <div>
        <h4 class="font-bold text-sm uppercase tracking-wider text-neutral-500 mb-4">Categories</h4>
        <div class="flex flex-col gap-3 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="category in categories" :key="category.id" class="flex items-center gap-3 group cursor-pointer">
            <Checkbox 
              v-model="selectedCategories" 
              :inputId="'cat-' + category.id" 
              name="category" 
              :value="category.id" 
              class="transition-all"
            />
            <label 
              :for="'cat-' + category.id" 
              class="text-sm font-medium text-neutral-700 cursor-pointer group-hover:text-primary transition-colors flex-1"
            >
              {{ category.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #263D87;
}
</style>