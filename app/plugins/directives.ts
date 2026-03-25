import scrollReveal from '../directives/scrollReveal'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Plugin: Registering scroll-reveal directive')
  nuxtApp.vueApp.directive('scroll-reveal', scrollReveal)
})