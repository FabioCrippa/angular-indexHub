import { Component, inject, ChangeDetectorRef, effect } from '@angular/core';
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
