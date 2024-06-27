import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPasswordStrong } from 'src/app/shared/validators/isPasswordStrong.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(public modal: NgbActiveModal) { }

  changePassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, isPasswordStrong()])
  });
  submitted: boolean = false;

  /**
   * 
   */
  handleSubmit() {
    this.submitted = true;

    if (this.changePassForm.valid) {

    }
  }

}
