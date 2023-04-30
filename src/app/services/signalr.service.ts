import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: HubConnection;
  constructor() { 
    this.hubConnection = new HubConnectionBuilder().withUrl('localhost:4200').build();
    this.hubConnection.start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error(err));
  }

  subscribeConnection(){
    this.hubConnection.on('message-sent',(data: any) => {
      console.log(`Received data: ${data}`);
    })
  }

  invokeConnection(data: any) {
    this.hubConnection.invoke('message-sent', data)
    .catch(err => console.error(err));
  }

}
