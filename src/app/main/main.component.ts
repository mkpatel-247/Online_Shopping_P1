import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { HeaderMenuComponent } from '../layout/header-menu/header-menu.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeaderMenuComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
