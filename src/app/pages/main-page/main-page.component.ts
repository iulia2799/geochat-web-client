import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ctt-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  

  searchForm: FormControl = new FormControl('');

  constructor(private fb: FormBuilder){

  }
  
  ngOnInit(): void {
  }


  logout(): void {
    localStorage.removeItem("token");
  }

}
