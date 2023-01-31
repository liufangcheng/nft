import { locale as zh } from './zh-CN';
import { locale as en } from './en-US';
const i18n = {
  'en-US': en,
  'zh-CN': zh,
};

export type LocaleType = keyof typeof en;

export default i18n;
