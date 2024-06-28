import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductGridComponent } from '../../product-grid/product-grid.component';

@Component({
  selector: 'app-related-product',
  standalone: true,
  imports: [CommonModule, CarouselModule, ProductGridComponent],
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent {

  @Input() categoryId: string = '';

  customOptions: OwlOptions = {
    loop: true,
    margin: 29,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    }
  }
}
