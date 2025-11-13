export type Locale = 'en' | 'fr' | 'de';

export type TranslationKeys = {
  previous: string;
  next: string;
  read_more: string;
  menu: string;
  message: string;
  submit: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
