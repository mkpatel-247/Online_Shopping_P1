import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appContainSpace]',
  standalone: true
})
export class ContainSpaceDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('input') keydown() {
    const el = this.elementRef.nativeElement as HTMLInputElement;
    const inputValue = el.value;
    const newValue = inputValue.replace(/(\s{2,})|[^a-zA-Z']/g, ' ');

    if (inputValue !== newValue) {
      el.value = newValue;
      el.dispatchEvent(new Event('input'))
    }
  }
}