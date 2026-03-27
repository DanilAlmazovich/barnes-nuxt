<script setup lang="ts">

import {axiosInstance} from "~/configs/axios";
import {useToast} from "primevue/usetoast";

const toast = useToast()

interface FormDataModel {
  name: string
  email: string
  message: string
}

const formData = ref<FormDataModel>({
  name: '',
  email: '',
  message: '',
})

const clearFormData = () => {
  formData.value = {
    name: '',
    email: '',
    message: '',
  }
}

const feedbackLoading = ref<boolean>(false)
const feedback = async () => {
  feedbackLoading.value = true
  try {
    await axiosInstance.post('/api/v1/feedback', formData.value)
    clearFormData()
    toast.add({ severity: 'success', summary: 'Subscribed!', life: 3000 })
  } catch (e) {
    console.log(e)
  } finally {
    feedbackLoading.value = false
  }
}

</script>

<template>
  <div class="pt-8 md:pt-10">
    <div class="container">
      <AppBreadcrumbs :items="[{ label: 'Contacts' }]" />
    </div>
  </div>
  <div class="bg-gray-50 flex-1 pt-8 xs:pt-12 pb-24 md:pb-32">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div class="flex flex-col gap-8 xs:gap-12">
          <div class="space-y-4">
            <span class="uppercase text-primary font-bold text-sm tracking-widest px-3 py-1 bg-primary/10 rounded-full">Contact us</span>
            <h1 class="text-3xl xs:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">Get in touch today</h1>
          </div>
          
          <div class="grid gap-4 xs:gap-8">
            <a href="mailto:sales@barnesfire.com" class="group">
              <div class="flex items-center gap-4 xs:gap-5 p-3 xs:p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 border border-transparent hover:border-neutral-100">
                <div class="w-10 h-10 xs:w-12 xs:h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3334 2.95117V11.2845C18.3334 11.837 18.1139 12.3669 17.7232 12.7576C17.3325 13.1483 16.8026 13.3678 16.2501 13.3678H3.75008C3.19755 13.3678 2.66764 13.1483 2.27694 12.7576C1.88624 12.3669 1.66675 11.837 1.66675 11.2845V2.95117" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.3334 2.95052C18.3334 2.39799 18.1139 1.86808 17.7232 1.47738C17.3325 1.08668 16.8026 0.867188 16.2501 0.867188H3.75008C3.19755 0.867188 2.66764 1.08668 2.27694 1.47738C1.88624 1.86808 1.66675 2.39799 1.66675 2.95052L8.89591 7.46441C9.22702 7.67135 9.60962 7.78108 10.0001 7.78108C10.3905 7.78108 10.7731 7.67135 11.1042 7.46441L18.3334 2.95052Z" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Sales</span>
                  <span class="text-neutral-900 font-semibold text-base xs:text-lg truncate">sales@barnesfire.com</span>
                </div>
              </div>
            </a>

            <a href="mailto:contact@barnesfire.com" class="group">
              <div class="flex items-center gap-4 xs:gap-5 p-3 xs:p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 border border-transparent hover:border-neutral-100">
                <div class="w-10 h-10 xs:w-12 xs:h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3334 2.95117V11.2845C18.3334 11.837 18.1139 12.3669 17.7232 12.7576C17.3325 13.1483 16.8026 13.3678 16.2501 13.3678H3.75008C3.19755 13.3678 2.66764 13.1483 2.27694 12.7576C1.88624 12.3669 1.66675 11.837 1.66675 11.2845V2.95117" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.3334 2.95052C18.3334 2.39799 18.1139 1.86808 17.7232 1.47738C17.3325 1.08668 16.8026 0.867188 16.2501 0.867188H3.75008C3.19755 0.867188 2.66764 1.08668 2.27694 1.47738C1.88624 1.86808 1.66675 2.39799 1.66675 2.95052L8.89591 7.46441C9.22702 7.67135 9.60962 7.78108 10.0001 7.78108C10.3905 7.78108 10.7731 7.67135 11.1042 7.46441L18.3334 2.95052Z" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Support</span>
                  <span class="text-neutral-900 font-semibold text-base xs:text-lg truncate">contact@barnesfire.com</span>
                </div>
              </div>
            </a>

            <a href="tel:+1 866-722-7637" class="group">
              <div class="flex items-center gap-4 xs:gap-5 p-3 xs:p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 border border-transparent hover:border-neutral-100">
                <div class="w-10 h-10 xs:w-12 xs:h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2517 17.3861L12.2608 17.3925C13.0478 17.8936 13.9823 18.1112 14.9097 18.0094C15.8372 17.9075 16.7022 17.4923 17.3617 16.8323L17.9346 16.2593C18.0616 16.1324 18.1623 15.9818 18.231 15.816C18.2998 15.6501 18.3351 15.4724 18.3351 15.2929C18.3351 15.1134 18.2998 14.9356 18.231 14.7698C18.1623 14.604 18.0616 14.4533 17.9346 14.3264L15.5181 11.9117C15.3912 11.7847 15.2405 11.684 15.0747 11.6153C14.9089 11.5466 14.7311 11.5112 14.5516 11.5112C14.3721 11.5112 14.1944 11.5466 14.0286 11.6153C13.8627 11.684 13.7121 11.7847 13.5852 11.9117C13.329 12.1678 12.9815 12.3117 12.6192 12.3117C12.2569 12.3117 11.9094 12.1678 11.6532 11.9117L7.78926 8.04683C7.53311 7.79061 7.38922 7.44314 7.38922 7.08085C7.38922 6.71855 7.53311 6.37108 7.78926 6.11486C7.91623 5.98797 8.01695 5.83731 8.08566 5.67148C8.15438 5.50566 8.18975 5.32792 8.18975 5.14841C8.18975 4.96891 8.15438 4.79117 8.08566 4.62534C8.01695 4.45952 7.91623 4.30886 7.78926 4.18197L5.3736 1.76723C5.11738 1.51108 4.76991 1.36719 4.40762 1.36719C4.04532 1.36719 3.69785 1.51108 3.44163 1.76723L2.86777 2.34017C2.20792 2.99981 1.79286 3.86483 1.69117 4.79229C1.58948 5.71975 1.80725 6.65415 2.30849 7.4411L2.31396 7.45021C4.96114 11.3668 8.33458 14.7396 12.2517 17.3861V17.3861Z" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Call Us</span>
                  <span class="text-neutral-900 font-semibold text-base xs:text-lg truncate">+1 866-722-7637</span>
                </div>
              </div>
            </a>

            <div class="group">
              <div class="flex items-center gap-4 xs:gap-5 p-3 xs:p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 border border-transparent hover:border-neutral-100">
                <div class="w-10 h-10 xs:w-12 xs:h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8609 8.95557C16.8609 14.3344 11.3517 17.6482 10.2068 18.2793C10.1434 18.3143 10.0722 18.3327 9.99974 18.3327C9.9273 18.3327 9.85605 18.3143 9.79263 18.2793C8.64688 17.6482 3.1394 14.3344 3.1394 8.95557C3.1394 4.6676 5.71219 1.66602 10.0002 1.66602C14.2881 1.66602 16.8609 4.6676 16.8609 8.95557Z" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.56982 8.52608C6.56982 9.43588 6.93124 10.3084 7.57456 10.9517C8.21788 11.595 9.09041 11.9565 10.0002 11.9565C10.91 11.9565 11.7825 11.595 12.4258 10.9517C13.0692 10.3084 13.4306 9.43588 13.4306 8.52608C13.4306 7.61629 13.0692 6.74376 12.4258 6.10044C11.7825 5.45712 10.91 5.0957 10.0002 5.0957C9.09041 5.0957 8.21788 5.45712 7.57456 6.10044C6.93124 6.74376 6.56982 7.61629 6.56982 8.52608V8.52608Z" stroke="#FF2600" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Address</span>
                  <span class="text-neutral-900 font-semibold text-sm xs:text-base line-clamp-2">1135 Okie St, Unit C Washington DC 20002</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="feedback" class="relative">
          <div class="absolute -inset-1 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl -z-10"></div>
          <div class="rounded-3xl bg-white p-6 xs:p-8 md:p-12 shadow-2xl shadow-neutral-200/50 border border-neutral-100">
            <div class="mb-8 xs:mb-10">
              <h3 class="font-extrabold text-xl xs:text-2xl text-neutral-900 mb-2">Send us a Message</h3>
              <p class="text-neutral-500 text-xs xs:text-sm">We'll get back to you within 24 hours.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
              <div class="space-y-2">
                <label class="text-[10px] font-bold text-neutral-900 uppercase tracking-widest ml-1">Name</label>
                <InputText v-model="formData.name" required class="w-full rounded-xl bg-neutral-50 border-neutral-200 focus:border-primary !p-3 xs:!p-3.5 transition-all text-sm" placeholder="Name"/>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold text-neutral-900 uppercase tracking-widest ml-1">Email</label>
                <InputText v-model="formData.email" required type="email" class="w-full rounded-xl bg-neutral-50 border-neutral-200 focus:border-primary !p-3 xs:!p-3.5 transition-all text-sm" placeholder="Email"/>
              </div>
            </div>
            
            <div class="space-y-2 mb-8 xs:mb-10">
              <label class="text-[10px] font-bold text-neutral-900 uppercase tracking-widest ml-1">Message</label>
              <Textarea v-model="formData.message" required placeholder="How can we help?" class="w-full rounded-xl min-h-32 xs:min-h-40 bg-neutral-50 border-neutral-200 focus:border-primary !p-3 xs:!p-3.5 transition-all text-sm"/>
            </div>

            <Button 
              :loading="feedbackLoading" 
              :disabled="feedbackLoading" 
              type="submit" 
              label="Send Message" 
              class="w-full !rounded-xl !py-3.5 !bg-[#FF2600] hover:!bg-[#D92100] !border-none !text-xs xs:!text-sm !font-bold !uppercase !tracking-widest shadow-lg shadow-red-500/10 transition-all active:scale-[0.98]"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
