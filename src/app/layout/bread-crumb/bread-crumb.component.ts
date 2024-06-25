import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent {

  constructor(public common: CommonService) { }

}
