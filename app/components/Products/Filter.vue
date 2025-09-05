<script setup lang="ts">
import {Select} from "primevue";
import {onMounted, ref} from "vue";
import {axiosInstance} from "~/configs/axios";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

interface CategoryModel {
  id: number
  name: string
}

const categories = ref<CategoryModel[]>([])

const getCategories = async (search?: string) => {
  try {
    const response = await axiosInstance.get(`/categories/categories`, {params: {per_page: 30, search: search}})
    categories.value = response.data.data
  } catch (e) {
    console.log(e)
  }
}

const selectedCategory = ref<number | null>(null)

onMounted(() => {
  getCategories()
  if(route.query.category_id) {
    selectedCategory.value = Number(route.query.category_id)
  }
})

const selectCategory = ({value}: { value: number }) => {
  router.push({name: 'products', query: {...route.query, category_id: value}})
}

const searchCategory = ({value}: {value: string}) => {
  getCategories(value)
}

</script>

<template>
  <aside class="col-span-3 bg-white rounded-lg shadow-sm px-4 pt-6 pb-10 max-xxl:shadow-none max-xxl:px-0">
    <h3 class="font-bold mb-3">Catalog</h3>
    <Select option-value="id"
            v-model="selectedCategory"
            :options="categories"
            size="small"
            showClear
            @change="selectCategory"
            filter
            class="w-full rounded-lg"
            @filter="searchCategory"
            option-label="name">
      <template #option="{option}">
        <div class="max-w-40">
          {{ option.name }}
        </div>
      </template>
    </Select>
  </aside>
</template>