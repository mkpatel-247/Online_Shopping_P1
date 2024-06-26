import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageService } from './toast-message.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent {
  constructor(public toastService: ToastMessageService) { }

}
