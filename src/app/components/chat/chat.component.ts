import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  constructor(
    private signalRService: SignalrService
  ){
    this.signalRService = new SignalrService();
  }


  ngOnInit(): void {
    
  }
}
