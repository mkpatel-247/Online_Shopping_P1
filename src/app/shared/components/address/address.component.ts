import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  siteConfig: any = '';

  ngOnInit(): void {
    this.siteConfig = JSON.parse(localStorage.getItem('siteConfig') || "null");
  }

}
