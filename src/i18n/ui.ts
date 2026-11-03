/**
 * Interface strings per locale. Content lives in src/content; these are the words the
 * templates add around it (navigation, labels, accessible names). EN and AR are drafts
 * until a translation is approved; keep keys identical across locales.
 */
import type { Locale } from './config';

const nl = {
  home: 'Home',
  mainNavigation: 'Hoofdnavigatie',
  openMenu: 'Menu openen',
  breadcrumb: 'Kruimelpad',
  pageNavigation: 'Paginanavigatie',
  onThisPage: 'Op deze pagina',
  otherFeelings: 'Andere gevoelens',
  allFeelings: (count: number) => `Alle ${count} gevoelens`,
  readOnIn: (group: string) => `Verder lezen in ${group}`,
  previousIn: (group: string) => `Vorige in ${group}`,
  nextIn: (group: string) => `Volgende in ${group}`,
  search: 'Zoeken',
};

export type UiStrings = typeof nl;

const en: UiStrings = {
  home: 'Home',
  mainNavigation: 'Main navigation',
  openMenu: 'Open menu',
  breadcrumb: 'Breadcrumb',
  pageNavigation: 'Page navigation',
  onThisPage: 'On this page',
  otherFeelings: 'Other feelings',
  allFeelings: (count: number) => `All ${count} feelings`,
  readOnIn: (group: string) => `Read on in ${group}`,
  previousIn: (group: string) => `Previous in ${group}`,
  nextIn: (group: string) => `Next in ${group}`,
  search: 'Search',
};

const ar: UiStrings = {
  home: 'الصفحة الرئيسية',
  mainNavigation: 'التنقل الرئيسي',
  openMenu: 'فتح القائمة',
  breadcrumb: 'مسار التنقل',
  pageNavigation: 'التنقل في الصفحة',
  onThisPage: 'في هذه الصفحة',
  otherFeelings: 'مشاعر أخرى',
  allFeelings: (count: number) => `كل المشاعر (${count})`,
  readOnIn: (group: string) => `تابع القراءة في ${group}`,
  previousIn: (group: string) => `السابق في ${group}`,
  nextIn: (group: string) => `التالي في ${group}`,
  search: 'بحث',
};

const strings: Record<Locale, UiStrings> = { nl, en, ar };

export const ui = (locale: Locale): UiStrings => strings[locale];
