import { Component, inject, ChangeDetectorRef, effect, HostListener, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  translateService = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  activeDetail: string = 'revistas';
  isMenuOpen: boolean = false;
  isBuscaSubmenuOpen: boolean = false;
  isBuscaMenuOpen: boolean = false;
  isSearchOpen: boolean = false; // Nova flag para controlar barra de busca
  isScrolled: boolean = false;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Effect para detectar mudanças no idioma e forçar atualização
    effect(() => {
      this.translateService.currentLang();
      this.cdr.markForCheck();
    });
  }

  showDetail(detail: string) {
    this.activeDetail = detail;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleBuscaSubmenuOpen() {
    this.isBuscaSubmenuOpen = !this.isBuscaSubmenuOpen;
  }

  openBuscaMenu() {
    this.isBuscaMenuOpen = true;
  }

  closeBuscaMenu() {
    this.isBuscaMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }

  // Método helper para tradução
  t(key: string): string {
    return this.translateService.translate(key);
  }
}
