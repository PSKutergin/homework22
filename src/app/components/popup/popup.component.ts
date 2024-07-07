import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';
import { Subscription } from 'rxjs';

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
    this.popupService.hidePopup();
    this.router.navigate(['/products']);
  }
}
