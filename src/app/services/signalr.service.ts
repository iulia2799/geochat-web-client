import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatReadDto, MessageReadDto } from '../chatApi/models';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: HubConnection;
  constructor() { 
    var accessToken: string = localStorage.getItem("token") ?? "";
    this.hubConnection = new HubConnectionBuilder().withUrl('https://geochatdefaultchat.azurewebsites.net/chatHub', 
    {
        accessTokenFactory: () => accessToken 
    }).build();
    this.hubConnection.start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error(err));
  }

  subscribeConnection(chatCreatedCallback: Function, messageReceivedCallback: Function){
    this.hubConnection.on('MessageReceived',(data: MessageReadDto) => {
      console.log(`Received message data: ${data}`);
      chatCreatedCallback(data);
    })

    this.hubConnection.on('ChatCreated',(data: ChatReadDto) => {
        console.log(`Received chat data: ${data}`);
        messageReceivedCallback(data);
      })

    this.hubConnection.onclose((e) => {
        console.error(e);
    })
  }
}
