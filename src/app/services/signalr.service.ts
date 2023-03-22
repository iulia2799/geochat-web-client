import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hubUrl?:string;
  connection: any;
  
  constructor() { }
}
