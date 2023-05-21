import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  constructor(
    private signalRService: SignalrService,
    private http: HttpClient
  ){
    this.signalRService = new SignalrService();
  }
  

  ngOnInit(): void {
  }
}
