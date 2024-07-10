import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, CategoriesComponent, FeaturedProductsComponent, SpecialOfferComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.breadCrumb.next([]);
  }
}
