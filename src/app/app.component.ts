import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderMenuComponent } from './layout/header-menu/header-menu.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastMessageComponent, LoaderComponent, HeaderComponent, HeaderMenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Online-Shopping-p1';
  showLoading: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Show loader when route changes.
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.showLoading = true;
      }
      if (e instanceof NavigationEnd) {
        this.showLoading = false;
      }
    })
  }
}
