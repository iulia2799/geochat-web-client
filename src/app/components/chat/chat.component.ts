import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  chatValue: any | undefined;
  messageForm!: FormControl;

  constructor(
    private signalRService: SignalrService,
    private http: HttpClient,
    private sharedMediaService: SharedmediaService,
    private fb: FormBuilder
  ){
    this.messageForm = this.fb.control('');
    console.log(localStorage.getItem('token'))
  }

  submit() {
    console.log(this.messageForm.value)
    //send message to user
    this.messageForm.reset();
  }


  ngOnInit(): void {
    //console.log(localStorage.getItem('loginToken'))
    this.sharedMediaService.value$.subscribe(value => {
      this.chatValue = value;
      console.log(this.chatValue)
    })
  }
}