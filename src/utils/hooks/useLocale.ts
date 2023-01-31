import { useContext } from 'react';
import { GlobalContext } from '@/context';
import defaultLocale from '@/locale';
import { isString } from 'lodash';
import { LocaleType } from '@/locale';

/**
 * 国际化hooks
 * @param locale 需要临时添加的
 * @param fields 需要哪些国际化  例如 global.
 * @returns [(key: stiring[], joinString: string) => stirng]
 */
export function useLocale(
  locale = null
): (key: LocaleType | LocaleType[], joinString?: string) => string {
  const { lang } = useContext(GlobalContext);
  const locales =
    {
      ...locale?.[lang],
      ...defaultLocale?.[lang],
    } || {};

  return (key: LocaleType | LocaleType[], joinString = '') => {
    if (isString(key)) {
      return locales[`${key}`];
    } else {
      return key?.map((item) => locales[`${item}`]).join(joinString);
    }
  };
}
