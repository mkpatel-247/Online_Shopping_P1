import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isCarouselActive: boolean = false;
  customOptions: any = {
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    // smartSpeed: 1000,
    responsive: {
        0:{
            items:1
        },
        576:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:1
        }
    }
  }

  ngOnInit(): void {
    
  }
}
