import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesService } from 'src/app/shared/service/pages.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {

  faqs: any;
  categoryList: any = [];
  selectedCategory: string = '';

  constructor(private commonService: CommonService, private cd: ChangeDetectorRef, private pagesService: PagesService) { }
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
    this.getFaqCategories();
  }

  /**
   * Get data of faq's.
   */
  getFaqData(categoryId: string) {
    this.pagesService.getFaqData(categoryId).subscribe({
      next: (res: any) => {
        this.selectedCategory = categoryId;
        this.faqs = res.data;
        this.cd.markForCheck()
      },
      error: (err: any) => {

      }
    })
  }

  /**
   * Get category list.
   */
  getFaqCategories() {
    this.pagesService.getFaqCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res.data;
        if (this.categoryList?.length) this.getFaqData(this.categoryList[0]._id);
        this.cd.markForCheck();
      },
      error: (err: any) => {
        this.categoryList = [];
      }
    })
  }
}
