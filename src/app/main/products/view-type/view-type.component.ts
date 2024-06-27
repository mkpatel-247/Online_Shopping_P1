import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-view-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss']
})
export class ViewTypeComponent {

  constructor(public commonService: CommonService) { }
}
