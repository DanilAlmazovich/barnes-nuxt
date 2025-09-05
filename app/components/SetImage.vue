<script setup lang="ts">
import {onMounted, ref, useAttrs} from "vue";
import axios from "axios";
import {axiosInstance} from "@/configs/axios.ts";
import {Env} from "@/configs/env.ts";

interface PropsImage {
  title?: string,
  imageUrl?: string,
  blobObject?: Blob
}

const attrs = useAttrs()
const {
  title = undefined,
  imageUrl = undefined,
  blobObject = null
} = defineProps<PropsImage>()

const getImage = async () => {
  setSrc(`${Env.BASE_API_URL}/${imageUrl}`)
}

const convertImage = (file: Blob) => {
  imageSrc.value = URL.createObjectURL(file)
}

const setSrc = (fileSrc: string) => {
  imageSrc.value = fileSrc
}

onMounted(() => {
  if (imageUrl) {
    getImage()
  }
  if (blobObject) {
    convertImage(blobObject)
  }
})
const imageSrc = ref<string | null>(null)

</script>

<template>
  <img
      v-if="imageSrc"
      v-bind="attrs"
      :src="imageSrc"
      :alt="title"
  >
</template>