import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-special-offer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './special-offer.component.html',
  styleUrl: './special-offer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialOfferComponent {

  specialOfferData: any = [];
  constructor(private commonService: CommonService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.setOfferBanner()
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
