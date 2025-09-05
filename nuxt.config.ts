// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import Lara from '@primeuix/themes/lara';
import {definePreset} from '@primeuix/themes';

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#263D87',
      600: '#2c4698',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },

    radius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      full: '9999px'
    },

    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          inverseColor: '{primary.400 }',
          hoverColor: '{primary.600}',
          activeColor: '{primary.500}',
        },
        highlight: {
          background: '{indigo.950}',
          focusBackground: '{indigo.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
    }
  },
  components: {
    select: {
      root: {
        borderRadius: '{radius.large}',
      },
    },
    button: {
      root: {
        borderRadius: '{radius.large}',
      }
    },
    inputtext: {
      root: {
        borderRadius: '{radius.large}'
      }
    }
  }
});

export default defineNuxtConfig({
  app: {
    head: {
      title: 'THE BARNES',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    output: {
      publicDir: 'dist'
    }
  },

  modules: ['@primevue/nuxt-module', 'nuxt-swiper'],

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue'
          }
        }
      }
    }
  }
})