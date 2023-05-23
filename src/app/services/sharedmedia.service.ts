import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedmediaService {

  private valueSubject = new Subject<any>();
  private valueSubjectUser = new Subject<any>();
  private chatsSubject = new Subject<any[]>();

  value$ = this.valueSubject.asObservable();
  chatsValues$ = this.chatsSubject.asObservable();
  userValue$ = this.valueSubject.asObservable();

  constructor() { }

  emitChats(value: any[]) {
    this.chatsSubject.next(value);
  }
  emitUser(value: any[]) {
    this.valueSubjectUser.next(value);
  }

  emitValue(value: any) {
    this.valueSubject.next(value);
  }
}
