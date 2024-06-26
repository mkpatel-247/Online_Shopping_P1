import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterByComponent } from './filter-by/filter-by.component';
import { ViewTypeComponent } from './view-type/view-type.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FilterByComponent, ViewTypeComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private common: CommonService) { }

  ngOnInit(): void {
    //Add router's data into common service breadCrumb subject
    this.common.breadCrumb.next(this.route.data);
  }

  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.common.breadCrumb.next('');
  }
}
