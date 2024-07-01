import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangePasswordComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any;
  constructor(private modalService: NgbModal, private authService: AuthService, private toastService: ToastMessageService) { }

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
}
