/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './presets/**/*.{js,vue,ts}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}'
  ],
  plugins: [require('tailwindcss-primeui')],
  /*
   * The site has no dark mode. This line is what keeps it that way: the
   * vendored PrimeVue theme under src/assets/primevue/ is written throughout
   * with `dark:` utilities, and this points them at an `app-dark` class that
   * nothing ever sets. Drop it and Tailwind falls back to the `media`
   * strategy, which turns every one of them on for any visitor whose OS is in
   * dark mode.
   */
  darkMode: ['selector', '[class*="app-dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        'primary-50': '#E5F0FF',
        'primary-100': '#CCE0FF',
        'primary-200': '#99C2FF',
        'primary-300': '#66A3FF',
        'primary-400': '#3385FF',
        'primary-500': '#0066FF',
        'primary-600': '#0052CC',
        'primary-700': '#003D99',
        'primary-800': '#002966',
        'primary-900': '#001433',
        'primary-950': '#000E24'
      }
    }
  }
}
