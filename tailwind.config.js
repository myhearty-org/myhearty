module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/constants.ts',
  ],
  theme: {
    extend: {
      boxShadow: {
        smooth:
          '0 4.5px 3.6px -8px rgba(0, 0, 0, 0.01), 0 12.5px 10px -8px rgba(0, 0, 0, 0.015), 0 30.1px 24.1px -8px rgba(0, 0, 0, 0.02), 0 100px 80px -8px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
