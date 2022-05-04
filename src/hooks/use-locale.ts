import { useTranslation } from 'next-i18next';

export function useLocale() {
  const { i18n, t } = useTranslation('common');

  return { i18n, t };
}
