<script setup lang="ts">

</script>

<template>
  <div class="pt-10 mb-6">
    <div class="container">
      <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4 max-md:text-xs">
        <nuxt-link to="/">
          <span>Home</span>
        </nuxt-link>
        <i class="pi pi-angle-right"></i>
        <span>Contacts</span>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 flex-1 pt-14 pb-30">
    <div class="container">
      <div class="grid grid-cols-2 max-md:grid-cols-1">
        <div class="flex flex-col gap-10">
          <span class="uppercase text-gray-400 font-medium text-lg">Contact us</span>
          <h1 class="text-4xl font-bold max-md:text-2xl max-lg:text-3xl">Get in touch today</h1>
<!--          <p class="text-gray-500 text-lg max-md:text-base">Lorem ipsum dolor sit amet consectetur adipiscing elit nulla adipiscing-->
<!--            tincidunt interdum tellus du.</p>-->
          <div class="flex flex-col gap-6">
            <a href="mailto:sales@barnesfire.com">
              <div class="flex items-center gap-2">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M18.3334 2.95117V11.2845C18.3334 11.837 18.1139 12.3669 17.7232 12.7576C17.3325 13.1483 16.8026 13.3678 16.2501 13.3678H3.75008C3.19755 13.3678 2.66764 13.1483 2.27694 12.7576C1.88624 12.3669 1.66675 11.837 1.66675 11.2845V2.95117"
                      stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M18.3334 2.95052C18.3334 2.39799 18.1139 1.86808 17.7232 1.47738C17.3325 1.08668 16.8026 0.867188 16.2501 0.867188H3.75008C3.19755 0.867188 2.66764 1.08668 2.27694 1.47738C1.88624 1.86808 1.66675 2.39799 1.66675 2.95052L8.89591 7.46441C9.22702 7.67135 9.60962 7.78108 10.0001 7.78108C10.3905 7.78108 10.7731 7.67135 11.1042 7.46441L18.3334 2.95052Z"
                      stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>sales@barnesfire.com</span>
              </div>
            </a>
            <a href="mailto:contact@barnesfire.com">
              <div class="flex items-center gap-2">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M18.3334 2.95117V11.2845C18.3334 11.837 18.1139 12.3669 17.7232 12.7576C17.3325 13.1483 16.8026 13.3678 16.2501 13.3678H3.75008C3.19755 13.3678 2.66764 13.1483 2.27694 12.7576C1.88624 12.3669 1.66675 11.837 1.66675 11.2845V2.95117"
                      stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M18.3334 2.95052C18.3334 2.39799 18.1139 1.86808 17.7232 1.47738C17.3325 1.08668 16.8026 0.867188 16.2501 0.867188H3.75008C3.19755 0.867188 2.66764 1.08668 2.27694 1.47738C1.88624 1.86808 1.66675 2.39799 1.66675 2.95052L8.89591 7.46441C9.22702 7.67135 9.60962 7.78108 10.0001 7.78108C10.3905 7.78108 10.7731 7.67135 11.1042 7.46441L18.3334 2.95052Z"
                      stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>contact@barnesfire.com</span>
              </div>
            </a>
            <a href="tel:+1 866-722-7637">
              <div class="flex items-center gap-2">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M12.2517 17.3861L12.2608 17.3925C13.0478 17.8936 13.9823 18.1112 14.9097 18.0094C15.8372 17.9075 16.7022 17.4923 17.3617 16.8323L17.9346 16.2593C18.0616 16.1324 18.1623 15.9818 18.231 15.816C18.2998 15.6501 18.3351 15.4724 18.3351 15.2929C18.3351 15.1134 18.2998 14.9356 18.231 14.7698C18.1623 14.604 18.0616 14.4533 17.9346 14.3264L15.5181 11.9117C15.3912 11.7847 15.2405 11.684 15.0747 11.6153C14.9089 11.5466 14.7311 11.5112 14.5516 11.5112C14.3721 11.5112 14.1944 11.5466 14.0286 11.6153C13.8627 11.684 13.7121 11.7847 13.5852 11.9117C13.329 12.1678 12.9815 12.3117 12.6192 12.3117C12.2569 12.3117 11.9094 12.1678 11.6532 11.9117L7.78926 8.04683C7.53311 7.79061 7.38922 7.44314 7.38922 7.08085C7.38922 6.71855 7.53311 6.37108 7.78926 6.11486C7.91623 5.98797 8.01695 5.83731 8.08566 5.67148C8.15438 5.50566 8.18975 5.32792 8.18975 5.14841C8.18975 4.96891 8.15438 4.79117 8.08566 4.62534C8.01695 4.45952 7.91623 4.30886 7.78926 4.18197L5.3736 1.76723C5.11738 1.51108 4.76991 1.36719 4.40762 1.36719C4.04532 1.36719 3.69785 1.51108 3.44163 1.76723L2.86777 2.34017C2.20792 2.99981 1.79286 3.86483 1.69117 4.79229C1.58948 5.71975 1.80725 6.65415 2.30849 7.4411L2.31396 7.45021C4.96114 11.3668 8.33458 14.7396 12.2517 17.3861V17.3861Z"
                      stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>+1 866-722-7637</span>
              </div>
            </a>
            <div class="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.8609 8.95557C16.8609 14.3344 11.3517 17.6482 10.2068 18.2793C10.1434 18.3143 10.0722 18.3327 9.99974 18.3327C9.9273 18.3327 9.85605 18.3143 9.79263 18.2793C8.64688 17.6482 3.1394 14.3344 3.1394 8.95557C3.1394 4.6676 5.71219 1.66602 10.0002 1.66602C14.2881 1.66602 16.8609 4.6676 16.8609 8.95557Z"
                    stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M6.56982 8.52608C6.56982 9.43588 6.93124 10.3084 7.57456 10.9517C8.21788 11.595 9.09041 11.9565 10.0002 11.9565C10.91 11.9565 11.7825 11.595 12.4258 10.9517C13.0692 10.3084 13.4306 9.43588 13.4306 8.52608C13.4306 7.61629 13.0692 6.74376 12.4258 6.10044C11.7825 5.45712 10.91 5.0957 10.0002 5.0957C9.09041 5.0957 8.21788 5.45712 7.57456 6.10044C6.93124 6.74376 6.56982 7.61629 6.56982 8.52608V8.52608Z"
                    stroke="#FF2600" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>1135 Okie St, Unit C Washington DC 20002</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>