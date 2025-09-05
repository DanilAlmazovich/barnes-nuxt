<template>
  <div class="min-h-screen flex flex-col justify-between">
        <Header/>
        <div class="flex-1 flex flex-col">
          <slot/>
        </div>
      <Footer/>
    </div>
</template>