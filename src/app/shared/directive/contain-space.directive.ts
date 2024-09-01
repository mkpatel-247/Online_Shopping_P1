import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appContainSpace]',
  standalone: true
})
/**
 * removes and trim extra white spaces between words 
 */
export class ContainSpaceDirective implements AfterViewInit {

  el: any;
  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.el = this.elementRef.nativeElement as HTMLInputElement;
  }
  @HostListener('input') keydown() {
    const inputValue = this.el.value;
    const newValue = inputValue.replace(/^\s+|\s+$|\s+(?=\s)/g, ' ');

    if (inputValue !== newValue) {
      this.el.value = newValue;
      this.el.dispatchEvent(new Event('input'))
    }
  }
  @HostListener('blur') trim() {
    const inputValue = this.el.value.trim();
    if (inputValue !== this.el.value) {
      this.el.value = inputValue;
      this.el.dispatchEvent(new Event('input'))
    }
  }
}