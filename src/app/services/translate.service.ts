import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private platformId = inject(PLATFORM_ID);
  currentLang = signal<Language>('pt');

  private translations: Translations = {
    'home': { pt: 'Home', en: 'Home' },
    'busca': { pt: 'Busca', en: 'Search' },
    'rankings': { pt: 'Rankings', en: 'Rankings' },
    'editor': { pt: 'Editor', en: 'Editor' },
    'revistas': { pt: 'Revistas Científicas', en: 'Scientific Journals' },
    'artigos': { pt: 'Artigos', en: 'Articles' },
    'autores': { pt: 'Autores', en: 'Authors' },
    'voltar': { pt: 'Voltar', en: 'Back' },
    'fechar': { pt: 'Fechar menu', en: 'Close menu' },
    'abrir': { pt: 'Abrir menu de navegação', en: 'Open navigation menu' }
  };

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage() {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Não executa no servidor
    }

    const savedLang = localStorage.getItem('language') as Language;
    
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      this.currentLang.set(savedLang);
    } else {
      // Detecta idioma do navegador
      const browserLang = navigator.language.toLowerCase();
      this.currentLang.set(browserLang.startsWith('pt') ? 'pt' : 'en');
    }
  }

  toggleLanguage() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const newLang: Language = this.currentLang() === 'pt' ? 'en' : 'pt';
    this.currentLang.set(newLang);
    localStorage.setItem('language', newLang);
  }

  translate(key: string): string {
    return this.translations[key]?.[this.currentLang()] || key;
  }

  // Método auxiliar para usar no template
  t = (key: string) => this.translate(key);
}
