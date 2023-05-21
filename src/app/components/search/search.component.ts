import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchForm: FormControl = new FormControl('');
  mockChats: string[] = [
    'chat 1',
    'chat 2',
    'chat 3',
    'penguin',
    'timisoara',
    'arad',
    'bucuresti'
  ]

  constructor(private fb: FormBuilder){

  }
  
  ngOnInit(): void {
  }

}
