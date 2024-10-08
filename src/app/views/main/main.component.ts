import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private popupSubscription!: Subscription;

  constructor(private popupService: PopupService, private router: Router) { }

  ngOnInit(): void {
    this.popupService.schedulePopup(10000);

    this.popupSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      if (!this.isUserStillOnPage()) {
        this.popupService.hidePopup();
      }
    });
  }

  ngAfterViewInit() {
    const accordion = $('#accordion');
    (accordion as any).accordion({
      icons: null,
      heightStyle: "content"
    });

    $(function () {
      (accordion as any).accordion();
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  isUserStillOnPage(): boolean {
    return this.router.url === '/';
  }
}