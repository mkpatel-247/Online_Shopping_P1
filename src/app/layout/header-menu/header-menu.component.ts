import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent { }
