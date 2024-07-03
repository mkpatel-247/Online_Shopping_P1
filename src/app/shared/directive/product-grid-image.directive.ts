import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductGridImage]',
  standalone: true
})
export class ProductGridImageDirective implements OnInit {

  originalImage: string = '';

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {
    this.originalImage = this.element.nativeElement.src;
    const imgType = this.originalImage.split('.');
    if (['png', 'jpeg'].includes(imgType[imgType.length - 1])) {
      this.renderer.addClass(this.element.nativeElement, 'loader');
    }
    this.renderer.addClass(this.element.nativeElement, 'grid-image');
  }

  @HostListener('load') onLoad() {
    this.element.nativeElement.src = this.originalImage;
    this.renderer.removeClass(this.element.nativeElement, 'loader')
  }

}
