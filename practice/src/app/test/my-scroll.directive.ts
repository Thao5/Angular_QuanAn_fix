import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyScroll]'
})
export class MyScrollDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollY = event.target.scrollY;

    if (scrollY >= 337) {
      // Change the background color of the element
      this.elementRef.nativeElement.style.backgroundColor = 'black';
    } else {
      // Change the background color of the element
      this.elementRef.nativeElement.style.backgroundColor = 'none';
    }
  }

}
