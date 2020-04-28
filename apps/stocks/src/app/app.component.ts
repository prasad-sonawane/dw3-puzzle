import { Component } from '@angular/core';
import { CONSTANT } from './app.constant';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = CONSTANT.TITLE;
  public titleText: string = CONSTANT.TITLE_TEXT;
}
