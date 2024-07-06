import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  helpSection : any;
  constructor(private commonService : CommonService) {}
  ngOnInit(): void {
    const breadCrumbData = [
      {
        pageTitle: 'Help',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'Help', link: '/help' }
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);

    this.getHelpData();
  }

  getHelpData() {
    this.commonService.getHelpCenterData().subscribe({
      next : (res:any) => {
        this.helpSection = res;
      },
      error : (err:any) => {
        
      }
    })
  }

}
