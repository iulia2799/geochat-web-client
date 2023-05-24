import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChatReadDto, MessageCreateDto, MessageReadDto } from 'src/app/chatApi/models';
import { MessagesService } from 'src/app/chatApi/services';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  chatValue: any | undefined;
  chatName!: string;
  messageForm!: FormControl;
  messageList: Array<MessageReadDto> = [];
  messageList$ = new BehaviorSubject<any[]>([]);
  loggedUserId = "";

  constructor(
    private signalRService: SignalrService,
    private http: HttpClient,
    private sharedMediaService: SharedmediaService,
    private fb: FormBuilder,
    private messageService: MessagesService,
    private cdr: ChangeDetectorRef,
  ){
  }

  submit() {
    console.log(this.messageForm.value)
    let parsedToken = JSON.parse(localStorage.getItem('userInfo') as string);
    let messageCreate: MessageCreateDto = {
      chatId: this.chatValue.id,
      content: this.messageForm.value,
      userId: parsedToken.Id
    }
    //send message to user
    this.messageService.apiMessagesPost$Response({body: messageCreate}).pipe().subscribe(
      (response) => {
        //console.log(response);
      }
    );


    this.messageForm.reset();
  }


  ngOnInit(){
    this.messageForm = this.fb.control('');
    //console.log(localStorage.getItem('token'))
    //console.log(localStorage.getItem('loginToken'))
    this.sharedMediaService.value$.subscribe(value => {
      this.chatValue = value;
      //console.log(value)
      if('chatName' in value) {
        this.chatName = value.chatName;
      }
      if('messages' in value) {
        this.messageList = value.messages;
        this.messageList = this.messageList.filter((value, index, array) => {
          const firstIndex = array.findIndex(obj => obj.id === value.id);
          return index === firstIndex;
        });
        this.messageList.sort((a,b) => {
          const timestampA = new Date(a.timeSent as string).getTime();
          const timestampB = new Date(b.timeSent as string).getTime();
          return timestampA - timestampB;
        });
        this.messageList$.next(this.messageList);
        const user = JSON.parse(localStorage.getItem('userInfo') as string);
        this.loggedUserId = user.Id;
        this.cdr.detectChanges();
        //console.log(this.loggedUserId)
      }
      console.log(this.messageList)
    });
    this.signalRService.subscribeConnection(
      (chatData: ChatReadDto) => {
      },
      (messageData: MessageReadDto) => {
        this.messageList.push(messageData);
        console.log(this.messageList)
        this.messageList = this.messageList.filter((value, index, array) => {
          const firstIndex = array.findIndex(obj => obj.id === value.id);
          return index === firstIndex;
        });
        console.log(this.messageList)
      }
    );
  }

}