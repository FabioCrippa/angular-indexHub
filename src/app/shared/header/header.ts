import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  activeDetail: string = 'revistas'; // detalhe padrão ao abrir o dropdown
  isMenuOpen: boolean = false;
  isBuscaSubmenuOpen: boolean = false;

  showDetail(detail: string) {
    this.activeDetail = detail;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleBuscaSubmenuOpen() {
    this.isBuscaSubmenuOpen = !this.isBuscaSubmenuOpen;
  }
}
