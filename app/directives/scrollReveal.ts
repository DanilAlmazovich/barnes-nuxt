export default {
  mounted(el: any, binding: any) {
    const options = {
      root: null,
      threshold: binding.value?.threshold || 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('opacity-100', 'translate-y-0', 'blur-0')
            el.classList.remove('opacity-0', 'translate-y-10', 'blur-sm')
          }, binding.value?.delay || 0)
          
          observer.unobserve(el)
        }
      })
    }, options)

    // Initial state
    el.classList.add(
      'opacity-0', 
      'translate-y-10', 
      'blur-sm',
      'transition-all', 
      'duration-[1000ms]', 
      'ease-[cubic-bezier(0.16,1,0.3,1)]',
      'will-change-[transform,opacity,filter]'
    )

    observer.observe(el)
  }
};