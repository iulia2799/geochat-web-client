import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  constructor(
    private signalRService: SignalrService,
    private http: HttpClient,
  ){
    this.signalRService = new SignalrService();
    this.http.get<any[]>('https://geochatidentity.azurewebsites.net/api/Users')
      .subscribe(
        (data: any[]) => {
          console.log(data)
        },
        error => {
          console.log('An error occurred:', error);
        }
      );
  }


  ngOnInit(): void {

  }
}