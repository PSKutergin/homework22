import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showPopup$: Observable<boolean> = this.showPopupSubject.asObservable();

  constructor() { }

  schedulePopup(delay: number): void {
    setTimeout(() => {
      this.showPopupSubject.next(true);
    }, delay);
  }

  hidePopup(): void {
    this.showPopupSubject.next(false);
  }
}