import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, catchError, combineLatest, finalize, map, of, startWith } from 'rxjs';
import { ChatCreateDto } from 'src/app/chatApi/models';
import { ChatService, UsersService as chatUserService } from 'src/app/chatApi/services';
import { UserResponseDto } from 'src/app/identityApi/models';
import { UsersService } from 'src/app/identityApi/services';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchForm: FormControl = new FormControl('');
  userList: Array<UserResponseDto> = [];

  filteredOptions$!: Observable<UserResponseDto[]>;
  userList$!: Observable<UserResponseDto[]>;

  constructor(private fb: FormBuilder,
    private usersService: UsersService,
    private sharedService: SharedmediaService,
    private chatService: ChatService,
    private chatUserService: chatUserService,
    private signalRService: SignalrService){

      this.userList$ = this.usersService.apiUsersGet$Response().pipe(
        map((users) => {
          return users;
        }),
        catchError((err) => of(err)),
        finalize(() => console.log('loaded'))
      );

      //console.log(localStorage.getItem('token'))
      this.usersService.apiUsersGet$Response().pipe().subscribe(
        (response) => {
          //console.log(response.body)
          const responseBody = response.body as unknown;
          this.userList = JSON.parse(responseBody as string);
        }
      )
  }
  
  async ngOnInit() {
    let searchedName$ = this.searchForm.valueChanges.pipe(startWith(''));
    this.filteredOptions$ = combineLatest([this.userList$, searchedName$]).pipe(
      map(([users, searchTerm]) => {
        this.userList = users instanceof Array ? users : this.userList;
        let usersFilter = this.userList;
  
        if (typeof searchTerm === 'string') {
          if (searchTerm.length) {
            usersFilter = usersFilter.filter(user => user.username?.toLowerCase().includes(searchTerm.toLowerCase()));
          }
        }
  
        return usersFilter;
      })
    );
    //this.signalRService.subscribeConnection();
  }

  private _filter(value: string): UserResponseDto[] {
    const filterValue = value.toLowerCase();
    console.log(value)
    if(!filterValue) {
      this.searchForm.reset();
      return this.userList;
    }
    // Filter the options based on the input value
    return this.userList.filter(option => option.username?.toLowerCase().includes(filterValue));
  }

  displayFn(option: UserResponseDto): string {
    return option.username ?? "";
  }

  optionSelection(event: MatAutocompleteSelectedEvent): void {
    const selectedOption = event.option.viewValue;
    let result = false;

    console.log(selectedOption);


    //now extract chat with the username in chat members

    this.chatService.apiChatGet$Json$Response().pipe().subscribe(
      (response) => {
        let responseArray = response.body;
        for(let element of responseArray) {
          if(element.chatMembers) {
            for(let chatmember of element.chatMembers) {
              if(chatmember.userName === selectedOption) {
                result = true;
                this.sharedService.emitValue(element);
              }
            }
          }
        }
        if(result === false) {
          let token = localStorage.getItem('userInfo');
          let parsedToken = JSON.parse(token as string);
          let friendId = "";
          //console.log(parsedToken);
          this.chatUserService.apiUsersNameNameGet$Json$Response({name: selectedOption}).pipe().subscribe(
            response => {
              let body = response.body;
              friendId = body[0].id as string;
            }
          );
          setTimeout(() => {
            let chatCreate: ChatCreateDto  = {
              friendUserId: friendId,
              userId: parsedToken.Id
            }
            let httprequestobject = {
              body: chatCreate
            }
            this.chatService.apiChatPost$Response(httprequestobject).pipe().subscribe(
              (response) => {
                console.log(response);
              }
            );
          }, 1000);
          
        }
      }
    );
    
    // Perform your desired action with the selected option
    // For example, log the selected option to the console
    //console.log(selectedOption);
    //this.sharedService.emitValue(selectedOption);

  }

}
