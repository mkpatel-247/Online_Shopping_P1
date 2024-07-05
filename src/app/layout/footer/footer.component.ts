import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { RouterModule } from '@angular/router';
import { ADDRESS, SOCIAL_LINKS } from 'src/app/shared/data/shared.data';
import { ACCOUNT_LINKS, QUICK_SHOP } from './footer.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NewsletterComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  address = ADDRESS;
  socialLinks = SOCIAL_LINKS;
  quickShopLinks = QUICK_SHOP;
  profileLinks = ACCOUNT_LINKS;
}
