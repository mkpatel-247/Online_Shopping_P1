import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-common-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-page.component.html',
  styleUrl: './common-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonPageComponent {

  slugData: any;
  slug: string = '';

  constructor(private commonService: CommonService, private cd: ChangeDetectorRef, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let breadCrumbData: { pageTitle: string; linkList: { label: string; link: string; }[]; }[];
    this.activeRoute.params.subscribe((res: any) => {
      this.slug = res.slug;
      breadCrumbData = [
        {
          pageTitle: this.slug,
          linkList: [
            { label: 'Home', link: '/home' },
            { label: this.slug, link: this.slug }
          ]
        }
      ]
      this.commonService.breadCrumb.next(breadCrumbData);
      this.getSlugData();
    })

    this.cd.markForCheck()
  }

  /**
   * getting data according to slug i.e., about us or helps
   */
  getSlugData() {
    this.commonService.getPageData(this.slug).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.slugData = res.data;
          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        this.router.navigate(['/product'])
      }
    })
  }

}
