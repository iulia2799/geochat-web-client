import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { SearchComponent } from './components/search/search.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/login/login.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChatListComponent,
    SearchComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
