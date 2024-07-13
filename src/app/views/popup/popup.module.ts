import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupRoutingModule } from './popup-routing.module';
import { PopupComponent } from './popup.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PopupRoutingModule
  ],
  exports: [PopupComponent]
})
export class PopupModule { }
