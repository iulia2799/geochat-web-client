import { Component, OnInit } from '@angular/core';
import { ChatReadDto, UserReadDto } from 'src/app/chatApi/models';
import { ChatService } from 'src/app/chatApi/services';
import { UserResponseDto } from 'src/app/identityApi/models';
import { UsersService } from 'src/app/identityApi/services';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit{

  chatList: Array<ChatReadDto> = [];
  userList: Array<UserResponseDto> = [];
  loggedInUser!: UserResponseDto;

  constructor(private sharedMediaService: SharedmediaService, private chatService: ChatService,
    private usersService: UsersService){
    this.getChats();
  }
  ngOnInit(): void {
    
  }

  getChats() {
    this.usersService.apiUsersGet$Response().pipe().subscribe(
      (response) => {
        //console.log(response.body)
        const responseBody = response.body as unknown;
        this.userList = JSON.parse(responseBody as string);
      }
    )
    this.chatService.apiChatGet$Json$Response().pipe().subscribe(
      (response) => {
        console.log(response)
        //this.chatList = response.body;
      }
    )
  }

  takeMeToChat(el: any) {
    this.sharedMediaService.emitValue(el);
  }

}
