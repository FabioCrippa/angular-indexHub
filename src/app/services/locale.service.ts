import { Injectable, signal, LOCALE_ID, inject } from '@angular/core';

export type SupportedLocale = 'pt-BR' | 'en-US' | 'es-ES';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private localeId = inject(LOCALE_ID);
  
  currentLocale = signal<SupportedLocale>(this.localeId as SupportedLocale);
  
  // Mapa de nomes amigáveis
  localeNames: Record<SupportedLocale, string> = {
    'pt-BR': 'Português',
    'en-US': 'English',
    'es-ES': 'Español'
  };

  // Mapa de flags
  localeFlags: Record<SupportedLocale, string> = {
    'pt-BR': 'PT',
    'en-US': 'EN',
    'es-ES': 'ES'
  };

  switchLocale(locale: SupportedLocale) {
    // Redireciona para a versão localizada da aplicação
    const currentPath = window.location.pathname;
    const baseHref = this.getBaseHref();
    
    // Remove locale atual do path se existir
    const pathWithoutLocale = currentPath.replace(/^\/(pt-BR|en-US|es-ES)/, '');
    
    // Constrói nova URL com locale
    const newUrl = `${baseHref}/${locale}${pathWithoutLocale}${window.location.search}${window.location.hash}`;
    
    window.location.href = newUrl;
  }

  private getBaseHref(): string {
    const base = document.querySelector('base');
    return base ? base.href.replace(/\/$/, '') : '';
  }

  getSupportedLocales(): SupportedLocale[] {
    return ['pt-BR', 'en-US', 'es-ES'];
  }
}
