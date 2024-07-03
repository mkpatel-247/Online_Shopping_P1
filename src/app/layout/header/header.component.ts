import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { FormsModule } from '@angular/forms';
import { LANGUAGE, PAGES_LINK } from './header.data';
import { CookieService } from 'ngx-cookie-service';
import { UserDetails } from 'src/app/shared/interface/user.interface';

declare var google: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  searchQuery: string = '';
  userDetails: UserDetails = { _id: '', firstName: '', lastName: '', email: '', phone: 0, createdAt: '', updatedAt: '', __v: 0, gender: '', dob: '', profilePic: '' };
  language = LANGUAGE;
  pagesLink = PAGES_LINK;
  constructor(private modalService: NgbModal, private authService: AuthService, private toastService: ToastMessageService, private router: Router, private cookieService: CookieService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.getUserDetails()
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
    this.authService.getSingleUser().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.userDetails = res.data;
          this.authService.userDetails.next(this.userDetails);
        }
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Error occurred while fetching your data")
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
  changeLanguage(languageCode: string) {
    this.cookieService.set('googtrans', '/' + 'en' + '/' + languageCode);
    this.cdr.detectChanges();
  }

  /**
   * Logout user.
   */
  logout() {
    localStorage.removeItem('loginToken');
    this.cdr.markForCheck();
  }
}
