<script setup lang="ts">
import { ref, onMounted } from "vue"

const props = defineProps<{
  delay?: number
}>()

const visible = ref(false)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            visible.value = true
          }, props.delay || 0)

          observer.disconnect()
        }
      },
      { threshold: 0.1 }
  )

  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <div
      ref="el"
      :class="[
      'transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter]',
      visible
        ? 'opacity-100 translate-y-0 scale-100 blur-0'
        : 'opacity-0 translate-y-12 scale-98 blur-sm'
    ]"
  >
    <slot />
  </div>
</template>