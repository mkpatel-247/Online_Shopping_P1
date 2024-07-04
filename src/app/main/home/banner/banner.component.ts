import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeService } from 'src/app/shared/service/home.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  bannerData: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.setBanner()
  }

  /**
   * get the banner data from api
   */
  setBanner() {
    this.homeService.getBanner().subscribe({
      next: (res: any) => {
        this.bannerData = res;
      },
      error: (err: any) => {
      }
    })
  }

}
