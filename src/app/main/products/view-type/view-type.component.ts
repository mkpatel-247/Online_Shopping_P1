import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-type',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss']
})
export class ViewTypeComponent { }
