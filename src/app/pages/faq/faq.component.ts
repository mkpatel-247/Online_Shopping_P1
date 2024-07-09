import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {

  faqs: any;
  categoryList: any = [];

  constructor(private commonService: CommonService, private cd: ChangeDetectorRef, private productService: ProductService) { }
  ngOnInit(): void {
    const breadCrumbData = [
      {
        pageTitle: 'Faq',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'Faq', link: '/faq' }
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
    this.getFaqData()
    this.getCategories();
  }

  getFaqData() {
    this.commonService.getFaqData().subscribe({
      next: (res: any) => {
        this.faqs = res;
        this.cd.markForCheck()
      },
      error: (err: any) => {

      }
    })
  }

  /**
   * Get category list.
   */
  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res.data;
        this.cd.markForCheck();
      },
      error: (err: any) => {
        this.categoryList = [];
      }
    })
  }
}
