import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductGridImage]',
  standalone: true
})
/**
 * Set the default image and set the grid-image class with set specific heigt width.
 */
export class ProductGridImageDirective implements OnInit {

  originalImage: string = '';

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {
    this.originalImage = this.element.nativeElement.src;
    const imgType = this.originalImage.split('.');
    this.renderer.addClass(this.element.nativeElement, 'grid-image');
  }
}
