import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  showPopup: boolean = false;
  private popupSubscription!: Subscription;

  constructor(private popupService: PopupService, private router: Router) { }

  ngOnInit(): void {
    this.popupSubscription = this.popupService.showPopup$.subscribe(show => {
      this.showPopup = show;
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  navigateToCatalog(): void {
    this.closePopup();
    this.router.navigate(['/products']);
  }

  closePopup(): void {
    this.popupService.hidePopup();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('popup-overlay')) {
      this.closePopup();
    }
  }
}