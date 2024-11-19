import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        customBlack: '#121212',
        customOrange: '#ee6c4d',
        customDarkOrange: '#b65037',
        customGray: '#f3f3f3',
      },
    },
  },
  plugins: [],
};
export default config;
