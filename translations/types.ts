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
  email_subject_user: string;
  email_greeting_user: string;
  email_body_user: string;
  email_personal_info: string;
  email_contact_soon: string;
  email_subject_admin: string;
  first_name_label: string;
  last_name_label: string;
  email_label: string;
  phone_label: string;
  message_label: string;
  field_required: string;
  invalid_email: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
