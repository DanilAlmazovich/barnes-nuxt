<script setup lang="ts">
</script>

<template>
  <section class="relative overflow-hidden bg-[#211C24] text-white">
    <div class="mx-auto container px-4 sm:px-6 lg:px-8 py-20 md:py-20">
      <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-6">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold whitespace-pre-line leading-tight mb-8 max-sm:text-xl">
            Cairns Black N5A New Yorker
          </h1>
          <p class="text-neutral-300 max-w-xl">The Cairns N5A New Yorker leather fire helmet is handcrafted and meets
            current OSHA requirements.</p>
          <div class="flex gap-3 pt-6">
            <NuxtLink to="/products?category_id=1">
              <button class="rounded-xl px-16 py-4  border border-white border-solid text-white">Show now</button>
            </NuxtLink>
          </div>
        </div>
        <div class="relative p-16">
          <img src="@/assets/images/promo.png" alt="slide" class="w-full rounded-2xl object-cover shadow-2xl"/>
        </div>
      </div>
    </div>
  </section>
</template>