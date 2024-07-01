import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  categories: any = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: () => { }
    })
  }
}
