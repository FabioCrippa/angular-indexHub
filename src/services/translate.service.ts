import { Injectable, signal } from '@angular/core';

export type Language = 'pt' | 'en' | 'es';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  currentLanguage = signal<Language>('pt');

  private translations: Translations = {
    home: {
      pt: 'Home',
      en: 'Home',
      es: 'Inicio'
    },
    busca: {
      pt: 'Busca',
      en: 'Search',
      es: 'Búsqueda'
    },
    rankings: {
      pt: 'Rankings',
      en: 'Rankings',
      es: 'Rankings'
    },
    editor: {
      pt: 'Editor',
      en: 'Publisher',
      es: 'Editor'
    },
    revistas: {
      pt: 'Revistas',
      en: 'Journals',
      es: 'Revistas Científicas'
    },
    artigos: {
      pt: 'Artigos',
      en: 'Articles',
      es: 'Artículos'
    },
    autores: {
      pt: 'Autores',
      en: 'Authors',
      es: 'Autores'
    },
    voltar: {
      pt: 'Voltar',
      en: 'Back',
      es: 'Volver'
    },
    fechar: {
      pt: 'Fechar',
      en: 'Close',
      es: 'Cerrar'
    },
    abrir: {
      pt: 'Abrir',
      en: 'Open',
      es: 'Abrir'
    },
    searchPlaceholder: {
      pt: 'Pesquisar revistas, artigos, autores...',
      en: 'Search journals, articles, authors...',
      es: 'Buscar revistas, artículos, autores...'
    },
    searchButton: {
      pt: 'Buscar',
      en: 'Search',
      es: 'Buscar'
    },
    'abrir menu': {
      pt: 'Abrir menu',
      en: 'Open menu',
      es: 'Abrir menú'
    },
    'fechar menu': {
      pt: 'Fechar menu',
      en: 'Close menu',
      es: 'Cerrar menú'
    }
  };

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[this.currentLanguage()];
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }

  toggleLanguage(): void {
    const languages: Language[] = ['pt', 'en', 'es'];
    const currentIndex = languages.indexOf(this.currentLanguage());
    const nextIndex = (currentIndex + 1) % languages.length;
    this.setLanguage(languages[nextIndex]);
  }

  currentLang(): Language {
    return this.currentLanguage();
  }
}
