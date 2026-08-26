import React, { createContext, useContext, useState } from 'react';
import en from '../translations/en.json';
import fr from '../translations/fr.json';
import ar from '../translations/ar.json';

const TRANSLATIONS = { en, fr, ar };

const LANG_META = {
  en: { code: 'en', name: 'English',   flag: '🇺🇸', rtl: false },
  fr: { code: 'fr', name: 'Français',  flag: '🇫🇷', rtl: false },
  ar: { code: 'ar', name: 'العربية',   flag: '🇲🇦', rtl: true  },
};

const I18nContext = createContext(null);

/**
 * Wrap your app root with this provider.
 * Usage:
 *   <I18nProvider>
 *     <App />
 *   </I18nProvider>
 */
export function I18nProvider({ children }) {
  const [langCode, setLangCode] = useState('en');

  /** Translate a dot-path key, e.g.  t('cases.title')  */
  const t = (key) => {
    const parts = key.split('.');
    let node = TRANSLATIONS[langCode];
    for (const part of parts) {
      if (!node) return key;
      node = node[part];
    }
    return node ?? key;
  };

  const switchLanguage = (code) => {
    if (TRANSLATIONS[code]) setLangCode(code);
  };

  const currentLang = LANG_META[langCode];

  return (
    <I18nContext.Provider value={{ t, langCode, switchLanguage, currentLang, LANG_META }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Hook to consume translations anywhere */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
