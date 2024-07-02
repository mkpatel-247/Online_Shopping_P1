import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { FormsModule } from '@angular/forms';
import { LANGUAGE } from './header.data';

declare var google: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchQuery: string = '';
  userDetails: any;
  language = LANGUAGE;
  constructor(private modalService: NgbModal, private authService: AuthService, private toastService: ToastMessageService, private router: Router) { }

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

  getUserDetails() {
    this.authService.getSingleUser().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.userDetails = res.data
        }

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

  changeLanguage(languageCode: string) {
    if (typeof google !== 'undefined' && google.translate) {
      console.log(google.translate.TranslateElement());

      const a = new google.translate.TranslateElement(
        {
          pageLanguage: languageCode,
          layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      console.log(a);

    }
  }
}
