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
  Modal: {
    centered: true,
    overflow: 'inside',
    withinPortal: false,
    zIndex: 999,
  },
};

export const MANTINE_CLASSNAMES = {
  Badge: {
    root: 'gap-2 whitespace-nowrap rounded px-2 py-3.5 text-sm font-medium normal-case',
    leftSection: 'h-6 w-6',
    rightSection: 'h-6 w-6',
  },
  Button: {
    root: 'focus:outline-none focus:ring focus:ring-pink-300 active:translate-y-0',
    subtle: 'text-gray-900',
  },
  Menu: {
    body: 'py-2 px-0',
    item: 'focus:ring-0',
    itemHovered: 'rounded-none bg-pink-500 text-white',
  },
  Modal: {
    modal: 'w-[440px] md:w-[560px]',
    title: 'font-medium',
    close: 'text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none',
  },
  Pagination: {
    item: 'text-sm font-normal focus:outline-none focus:ring focus:ring-pink-300 active:translate-y-0',
  },
};
