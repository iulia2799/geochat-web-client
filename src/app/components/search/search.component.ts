import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { ChatService } from 'src/app/chatApi/services';
import { UserResponseDto } from 'src/app/identityApi/models';
import { UsersService } from 'src/app/identityApi/services';
import { SharedmediaService } from 'src/app/services/sharedmedia.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchForm: FormControl = new FormControl('');
  userList: Array<UserResponseDto> = [];

  filteredOptions$!: Observable<any[]>;

  constructor(private fb: FormBuilder,
    private usersService: UsersService,
    private sharedService: SharedmediaService){

      //console.log(localStorage.getItem('token'))
      this.usersService.apiUsersGet$Response().pipe().subscribe(
        (response) => {
          //console.log(response.body)
          const responseBody = response.body as unknown;
          this.userList = JSON.parse(responseBody as string);
        }
      )
  }
  
  ngOnInit(): void {
    this.filteredOptions$ = this.searchForm.valueChanges.pipe(
      startWith(''), // Start with an empty string
      map((value: any) => this._filter(value)) // Map the input value to filtered options
    );
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
    
    // Perform your desired action with the selected option
    // For example, log the selected option to the console
    //console.log(selectedOption);
    this.sharedService.emitValue(selectedOption);

  }

}
