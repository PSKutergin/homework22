import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
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
}
