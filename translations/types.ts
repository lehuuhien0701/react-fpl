export type Locale = 'en' | 'fr' | 'de';

export type TranslationKeys = {
  previous: string;
  next: string;
  read_more: string;
  menu: string;
  message: string;
  submit: string;
  share_label: string;
  other_articles_label: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
