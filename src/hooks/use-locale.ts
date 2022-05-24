import { useTranslation } from 'next-i18next';

export function useLocale(namespace?: string) {
  const { i18n, t } = useTranslation(namespace || 'common');

  return { i18n, t };
}
