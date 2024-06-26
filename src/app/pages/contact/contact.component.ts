import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
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
