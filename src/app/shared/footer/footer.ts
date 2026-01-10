import { Component, HostListener, PLATFORM_ID, inject, signal, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  
  currentYear = new Date().getFullYear();
  isFooterVisible = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const footer = this.elementRef.nativeElement;
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Footer está visível quando topo do footer está na viewport
      this.isFooterVisible.set(rect.top < windowHeight);
    }
  }
}
