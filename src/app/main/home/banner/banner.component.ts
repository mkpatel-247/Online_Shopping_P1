import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {

  bannerData: any = [];
  specialOfferData: any = [];

  constructor(private productService: ProductService, private cd: ChangeDetectorRef, private commonService: CommonService) { }

  ngOnInit(): void {
    this.setBanner()
    this.setOfferBanner()
  }

  /**
   * get the banner data from api
   */
  setBanner() {
    this.productService.getAllCategories({ 'isBanner': true }).subscribe({
      next: (res: any) => {
        this.bannerData = res.data;
        this.cd.markForCheck()
      },
      error: (err: any) => {
        this.bannerData = [];
      }
    })
  }

  /**
   * getting special offer data 
   */
  setOfferBanner() {
    this.commonService.getOfferBanner().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.specialOfferData = res.data;
          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        this.specialOfferData = [];
        this.cd.markForCheck();
      }
    })
  }

}
