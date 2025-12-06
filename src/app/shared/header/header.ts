import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  activeDetail: string = 'revistas'; // detalhe padrão ao abrir o dropdown

  showDetail(detail: string) {
    this.activeDetail = detail;
  }
}
