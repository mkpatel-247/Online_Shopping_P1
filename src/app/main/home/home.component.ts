import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, CategoriesComponent, FeaturedProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}
