import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-additional-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-additional-info.component.html',
  styleUrls: ['./product-additional-info.component.scss']
})
export class ProductAdditionalInfoComponent {
  @Input({ required: true }) information: string = '';
}
