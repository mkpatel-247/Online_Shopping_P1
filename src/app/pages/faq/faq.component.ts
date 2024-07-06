import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faqs : any;
  constructor(private commonService : CommonService) {}
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
  }

  getFaqData() {
    this.commonService.getFaqData().subscribe({
      next : (res:any) => {
        this.faqs = res;
      },
      error : (err:any) => {
        
      }
    })
  }
}
