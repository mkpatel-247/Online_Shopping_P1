import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ProductGridImageDirective } from 'src/app/shared/directive/product-grid-image.directive';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbRating, ProductGridImageDirective],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  @Input({ required: true }) products: any = '';
  @Output() wishlist = new EventEmitter<any>();
}
