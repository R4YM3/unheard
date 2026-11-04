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
  darkMode: 'Donkere modus',
  perspectiveHeading: 'Wat je hoort. Wat je voelt.',
  perspectiveIntro:
    'Hetzelfde moment, van twee kanten. Dit zijn fictieve voorbeelden, geen diagnoses.',
  youHear: 'Je hoort',
  youFeel: 'Je voelt',
  chooseExample: 'Kies een voorbeeld',
  warmLine: 'Van jou mag ook gehouden worden.',
  writtenBy: 'Geschreven door',
  overview: 'Overzicht',
  byFounder: 'de oprichter van Ongehoord',
  byEditorial: 'de redactie van Ongehoord',
  publishedOn: 'gepubliceerd op',
  updatedOn: 'bijgewerkt op',
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
  darkMode: 'Dark mode',
  perspectiveHeading: 'What you hear. What you feel.',
  perspectiveIntro: 'The same moment, from two sides. These are fictional examples, not diagnoses.',
  youHear: 'You hear',
  youFeel: 'You feel',
  chooseExample: 'Choose an example',
  warmLine: 'You deserve to be loved too.',
  writtenBy: 'Written by',
  overview: 'Overview',
  byFounder: 'the founder of Ongehoord',
  byEditorial: 'the Ongehoord editors',
  publishedOn: 'published on',
  updatedOn: 'updated on',
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
  darkMode: 'الوضع الداكن',
  perspectiveHeading: 'ما تسمعه. ما تشعر به.',
  perspectiveIntro: 'اللحظة نفسها من جانبين. هذه أمثلة خيالية وليست تشخيصًا.',
  youHear: 'تسمع',
  youFeel: 'تشعر',
  chooseExample: 'اختر مثالًا',
  warmLine: 'أنت أيضًا تستحق أن تُحَب.',
  writtenBy: 'كتبه',
  overview: 'نظرة عامة',
  byFounder: 'مؤسس Ongehoord',
  byEditorial: 'فريق تحرير Ongehoord',
  publishedOn: 'نُشر في',
  updatedOn: 'حُدّث في',
};

const strings: Record<Locale, UiStrings> = { nl, en, ar };

export const ui = (locale: Locale): UiStrings => strings[locale];
