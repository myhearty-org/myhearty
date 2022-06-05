import { MantineThemeOverride } from '@mantine/core';

export const MANTINE_THEME: MantineThemeOverride = {
  fontFamily: 'apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Ubuntu',
  colors: {
    brand: [
      '#fdf2f8',
      '#fce7f3',
      '#fbcfe8',
      '#fcc2d7',
      '#f9a8d4',
      '#f472b6',
      '#ec4899',
      '#db2777',
      '#be185d',
      '#9d174d',
    ],
  },
  primaryColor: 'brand',
  focusRing: 'always',
};

export const MANTINE_CLASSNAMES = {
  Button: {
    root: 'focus:outline-none focus:ring focus:ring-pink-300 active:translate-y-0',
    subtle: 'text-gray-900',
  },
};
