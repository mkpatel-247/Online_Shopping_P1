import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';

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

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setBanner()
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

}
