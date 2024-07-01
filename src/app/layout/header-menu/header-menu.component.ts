import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent  implements OnInit{ 

  numberOfCartItem : number = 0;
  constructor(public productService: ProductService) {}
  
  ngOnInit(): void {
    const storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
    if(storedItem) {
      storedItem.filter((item:any) => this.numberOfCartItem += item.quantity);
      this.productService.cartItems.next(this.numberOfCartItem)
    }
    this.productService.cartItems.subscribe((res:number) => this.numberOfCartItem = res)    
  }
}
