import { Component } from '@angular/core';

@Component({
  selector: 'ctt-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  logout(): void {
    localStorage.removeItem("token");
  }

}
