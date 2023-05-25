import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatReadDto, MessageReadDto, UserReadDto } from 'src/app/chatApi/models';
import { ChatService } from 'src/app/chatApi/services';
import { UserResponseDto } from 'src/app/identityApi/models';
import { UsersService } from 'src/app/identityApi/services';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit{

  chatList: Array<ChatReadDto> = [];
  chatList$!: Observable<Array<ChatReadDto>>;
  userList: Array<UserResponseDto> = [];
  loggedInUser!: UserResponseDto;

  constructor(private sharedMediaService: SharedmediaService, private chatService: ChatService,
    private usersService: UsersService,
    private signalRService: SignalrService){
    
  }
  ngOnInit() {
    
    this.signalRService.subscribeConnection(
      (chatData: ChatReadDto) => {
        // Handle chat data
        // Update relevant component variable(s)
        console.log(chatData)
        this.chatList.push(chatData);
        this.chatList$ = of(this.chatList);
      },
      (messageData: MessageReadDto) => {
        // Handle message data
        // Update relevant component variable(s)
        //this.chatList.push(messageData);
        //this.chatList$ = of(this.chatList);
        console.log(messageData)
        this.chatList.forEach((element)=> {
          if(element.id === messageData.chatId) {
            element.messages?.unshift(messageData);
          }
        });
      }
    );
    this.getChats();
  }

  getChats() {
    setTimeout(()=> {
      this.chatService.apiChatGet$Json$Response().pipe().subscribe(
        (response) => {
          console.log(response)
          this.chatList = response.body;
          this.chatList$ = of(this.chatList);
        }
      )
    },1500);
   
  }

  takeMeToChat(el: any) {
    this.sharedMediaService.emitValue(el);
  }

  // async chatListCallback(chats: any) {
  //   console.log(chats)
  // }
  // async messageListCallback(message: any) {
  //   console.log(message)
  // }

}
