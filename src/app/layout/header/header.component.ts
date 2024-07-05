import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { FormsModule } from '@angular/forms';
import { LANGUAGE, PAGES_LINK } from './header.data';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';

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

  searchQuery: string = '';
  firstName: string = '';
  language = LANGUAGE;
  pagesLink = PAGES_LINK;
  numberOfCartItem: number = 0;
  constructor(private modalService: NgbModal, public authService: AuthService, private toastService: ToastMessageService, private router: Router, private cdr: ChangeDetectorRef, private toast: ToastMessageService) { }

  ngOnInit(): void {
    this.getUserDetails();
    const storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
    if (storedItem) {
      this.numberOfCartItem = storedItem.length;
    }
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
      this.router.navigate(['/product'], { queryParams: { search: this.searchQuery.trim() } })
    } else {
      this.searchQuery = this.searchQuery.trim();
    }
  }

  /**
   * Change the language of page.
   * @param languageCode code of language
   */
  async changeLanguage(languageCode: string) {
    document.cookie = 'googtrans=' + `/en/${languageCode}`
    location.reload();
  }

  /**
   * Logout user.
   */
  logout() {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('userDetail');
    this.authService.isLoggedIn.next(false);
    this.toast.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Logout Successfully");
    this.cdr.markForCheck();
  }

  eraseSearchRecords() {
    if (this.searchQuery && this.router.url.includes('/product')) {
      this.searchQuery = '';
      this.router.navigate(['/product'], { queryParams: { search: '' } })
    } else {
      this.searchQuery = '';
    }
  }
}
