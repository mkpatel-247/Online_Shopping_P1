import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {

  categories: any = '';
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.categories = []
      },
    })
  }
}
