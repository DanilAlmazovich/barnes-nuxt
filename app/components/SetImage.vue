<script setup lang="ts">
import {computed, useAttrs, onBeforeUnmount, ref, watch} from "vue";
import {Env} from "@/configs/env.ts";

interface PropsImage {
  title?: string,
  imageUrl?: string,
  blobObject?: Blob
}

const attrs = useAttrs()
const props = defineProps<PropsImage>()

const objectUrl = ref<string | null>(null)

// Очистка памяти при смене объекта или размонтировании
const cleanup = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = null
  }
}

watch(() => props.blobObject, (newBlob) => {
  cleanup()
  if (newBlob && process.client) {
    objectUrl.value = URL.createObjectURL(newBlob)
  }
}, { immediate: true })

onBeforeUnmount(cleanup)

const finalSrc = computed(() => {
  if (objectUrl.value) {
    return objectUrl.value
  }
  if (props.imageUrl) {
    if (props.imageUrl.startsWith('http') || props.imageUrl.startsWith('blob:')) {
      return props.imageUrl
    }
    return `${Env.BASE_API_URL}/${props.imageUrl}`
  }
  return null
})

// Если это Blob, используем обычный img, так как NuxtImg не может его оптимизировать
const isBlob = computed(() => !!objectUrl.value || props.imageUrl?.startsWith('blob:'))
</script>

<template>
  <template v-if="finalSrc">
    <img
        v-if="isBlob"
        v-bind="attrs"
        :src="finalSrc"
        :alt="title || 'Product Image'"
    >
    <NuxtImg
        v-else
        v-bind="attrs"
        :src="finalSrc"
        :alt="title || 'Product Image'"
        loading="lazy"
        format="webp"
        quality="80"
        placeholder
    />
  </template>
</template>
