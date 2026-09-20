import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { db } from '../services/db';

interface Translations {
  [key: string]: {
    hi: string;
    bho: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  appName: {
    hi: 'छठ पर्व',
    bho: 'छठि परब',
    en: 'Chhath Parv'
  },
  appSubtitle: {
    hi: 'छठ पूजा • गीत • विधि • व्रत',
    bho: 'छठि पूजा • गीत • बिधी • बरत',
    en: 'Chhath Puja • Geet • Vidhi • Vrat'
  },
  jaiChhathiMaiya: {
    hi: 'जय छठी मईया',
    bho: 'जय छठी मइया',
    en: 'Jai Chhathi Maiya'
  },
  navHome: {
    hi: 'मुख्य पृष्ठ',
    bho: 'गृह',
    en: 'Home'
  },
  navGeet: {
    hi: 'छठ गीत',
    bho: 'छठि गीत',
    en: 'Geet'
  },
  navPuja: {
    hi: 'पूजा विधि',
    bho: 'पूजा बिधी',
    en: 'Puja'
  },
  navChecklist: {
    hi: 'चेकलिस्ट',
    bho: 'सामान सूची',
    en: 'Checklist'
  },
  navMore: {
    hi: 'अन्य / अधिक',
    bho: 'अउरी सब',
    en: 'More'
  },
  festivalYear: {
    hi: 'छठ महापर्व 2026',
    bho: 'छठि महापरब 2026',
    en: 'Chhath Mahaparv 2026'
  },
  countdownTitle: {
    hi: 'महापर्व आगमन में शेष समय',
    bho: 'परब आवे में अतना समय बाचल बा',
    en: 'Countdown to Chhath'
  },
  days: {
    hi: 'दिन',
    bho: 'दिन',
    en: 'Days'
  },
  hours: {
    hi: 'घंटे',
    bho: 'घंटा',
    en: 'Hours'
  },
  minutes: {
    hi: 'मिनट',
    bho: 'मिनट',
    en: 'Mins'
  },
  seconds: {
    hi: 'सेकंड',
    bho: 'सेकन',
    en: 'Secs'
  },
  fourDaysTitle: {
    hi: 'छठ महापर्व के चार पावन दिवस',
    bho: 'छठि महापरब के चारु पावन दिन',
    en: 'Four Sacred Days of Chhath'
  },
  continuePrep: {
    hi: 'तैयारी जारी रखें',
    bho: 'तैयारी आगे बढ़ाईं',
    en: 'Continue Preparation'
  },
  prepCompleted: {
    hi: 'तैयारी पूर्ण',
    bho: 'तैयारी पूरा भइल',
    en: 'completed'
  },
  todayRitual: {
    hi: 'आज का अनुष्ठान व नियम',
    bho: 'आजु के नियम व बिधी',
    en: "Today's Ritual"
  },
  quickActions: {
    hi: 'त्वरित सुविधाएँ',
    bho: 'झटपट सुबिधा',
    en: 'Quick Access'
  },
  popularGeet: {
    hi: 'पारंपरिक छठ गीत',
    bho: 'पारंपरिक छठि गीत',
    en: 'Popular Chhath Geet'
  },
  regionalNotice: {
    hi: 'बिहार, झारखंड, पूर्वी उत्तर प्रदेश और मिथिलांचल के विभिन्न क्षेत्रों में परंपराओं में आंशिक भिन्नता हो सकती है।',
    bho: 'बिहार, झारखंड, पुरुबी उत्तर परदेस आ मिथिलांचल के अलग-अलग जगह रीत-रिवाज में तनिका भेद हो सकेला।',
    en: 'Customs and traditions may slightly vary across Bihar, Jharkhand, Eastern UP, and Mithila regions.'
  },
  disclaimerHealthcare: {
    hi: 'उपवास व स्वास्थ्य संबंधी सावधानी: उपवास के नियम व्यक्तिगत स्वास्थ्य पर निर्भर करते हैं। गर्भवती महिलाओं या किसी चिकित्सीय स्थिति में योग्य डॉक्टर के परामर्श का पालन अवश्य करें।',
    bho: 'उपवास व सेहत: बरत के नियम आपन सेहत पर निर्भर करेला। कवनो बेमारी या दवई के जरूरत में डाक्टर के सलाह जरूर लीं।',
    en: 'Fasting practices vary. People with medical conditions, pregnancy, or medication requirements should follow advice from a qualified healthcare professional.'
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return db.getSettings().language || 'hi';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    db.saveSettings({ language: lang });
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    if (TRANSLATIONS[key] && TRANSLATIONS[key]['hi']) {
      return TRANSLATIONS[key]['hi'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
