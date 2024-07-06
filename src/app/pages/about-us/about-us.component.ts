import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
  constructor(private commonService : CommonService) {}
  ngOnInit(): void {
    const breadCrumbData = [
      {
        pageTitle: 'About Us',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'About Us', link: '/about-us' }
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
  }
}
