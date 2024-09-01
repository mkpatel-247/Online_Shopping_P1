import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { FormsModule } from '@angular/forms';
import { PAGES_LINK } from './header.data';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';
import { ProductService } from 'src/app/shared/service/product.service';
import { CommonService } from 'src/app/shared/service/common.service';

declare var google: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordComponent, FormsModule, ContainSpaceDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  siteConfig: any = '';
  searchQuery: string = '';
  firstName: string = '';
  language: any = '';
  pagesLink = PAGES_LINK;
  numberOfCartItem: number = 0;
  wishlistItem: number = 0;
  constructor(private modalService: NgbModal, public authService: AuthService, private router: Router, private cdr: ChangeDetectorRef, private productService: ProductService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getUserDetails();
    const storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
    if (storedItem) {
      this.numberOfCartItem = storedItem.length;
    }
    this.getWishlistItemNumber();
    this.getLanguages();
    this.siteConfig = JSON.parse(localStorage.getItem('siteConfig') || "null");
  }
  /**
   * open a modal to change the password
   */
  openChangePassModal() {
    this.modalService.open(ChangePasswordComponent, {})
  }

  /**
   * Get the user details to show his/her name and menu.
   */
  getUserDetails() {
    this.authService.userDetail.subscribe({
      next: (res: any) => {
        if (res) {
          this.firstName = res.firstName;
        }
        this.cdr.markForCheck();
      },
      complete: () => {
        this.authService.isLoggedIn.next(true);
      }
    });
  }

  /**
   * Navigate to shop page and show the matched search query items.
   */
  searchRecords() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/product'], { queryParams: { search: this.searchQuery.trim() }, queryParamsHandling: 'merge' })
    } else {
      this.searchQuery = this.searchQuery.trim();
    }
  }

  /**
   * Change the language of page.
   * @param languageCode code of language
   */
  changeLanguage(languageCode: string) {
    document.cookie = 'googtrans=' + `/en/${languageCode.toLowerCase()}`
    location.reload();
  }

  /**
   * Logout user.
   */
  logout() {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userDetail');
    this.authService.isLoggedIn.next(false);
    this.productService.cartItems.next(0);
    this.productService.wishlistItems.next(0);
    this.router.navigate(['/home']);
    this.cdr.markForCheck();
  }

  /**
   * If user want to erase the search input.
   */
  eraseSearchRecords() {
    if (this.searchQuery && this.router.url.includes('/product')) {
      this.searchQuery = '';
      this.router.navigate(['/product'], { queryParams: { search: '' }, queryParamsHandling: 'merge' })
    } else {
      this.searchQuery = '';
    }
  }

  /**
   * Get the number of items in wishlist.
   */
  getWishlistItemNumber() {
    this.productService.wishlistItems.subscribe({
      next: (res: any) => {
        this.wishlistItem = res;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Get lanuage/
   */
  getLanguages() {
    this.commonService.getLanguageOrCountry({ type: 'language' }).subscribe({
      next: (res: any) => {
        this.language = res.data;
      },
      error: (err: any) => {
        this.language = [];
      }
    });
  }
}
