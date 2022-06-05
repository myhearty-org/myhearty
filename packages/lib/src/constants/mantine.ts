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

export const MANTINE_DEFAULT_PROPS = {
  Menu: {
    withArrow: true,
    withinPortal: false,
  },
};

export const MANTINE_CLASSNAMES = {
  Button: {
    root: 'focus:outline-none focus:ring focus:ring-pink-300 active:translate-y-0',
    subtle: 'text-gray-900',
  },
  Menu: {
    body: 'py-2 px-0',
    item: 'focus:ring-0',
    itemHovered: 'rounded-none bg-pink-500 text-white',
  },
};
