<script setup lang="ts">
import AnimateBlock from "~/components/AnimateBlock.vue";
</script>
<template>
    <HomePromo/>
  <AnimateBlock :delay="100">
    <HomeDiscoverBrands/>
  </AnimateBlock>
  <AnimateBlock :delay="200">
    <HomeAboutUs/>
  </AnimateBlock>
  <AnimateBlock :delay="350">
    <HomeCatalog/>
  </AnimateBlock>
  <AnimateBlock :delay="400">
    <HomeCTA/>
  </AnimateBlock>
</template>