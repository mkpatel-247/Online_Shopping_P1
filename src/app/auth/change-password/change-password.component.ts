import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPasswordStrong } from 'src/app/shared/validators/custom.validator';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(public modal: NgbActiveModal, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.router.navigate(['/home']);
      return;
    }
  }
  changePassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, isPasswordStrong()])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  /**
   * 
   */
  handleSubmit() {
    this.submitted = true;

    if (this.changePassForm.valid) {

    }
  }

}
