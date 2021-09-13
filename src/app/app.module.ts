// modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {StoreModule} from '@ngrx/store';
// components
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header.component";
import {PostComponent} from "./containers/post.component";
import {UserComponent} from "./containers/users.component";
import {UserCardComponent} from "./components/user-card.component";
import {UserListComponent} from "./components/user-list.component";
import {ErrorComponent} from "./components/error.component";

import {rootReducer} from "./Store/reducers";
// service
import {HttpService} from "./services/http.service";
import {ApiService} from "./services/api.service";
import {StoreSerive} from "./services/store.serive";
import {environment} from "../environments/environment";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {ReactiveFormsModule} from "@angular/forms";
import {UpdateUserComponent} from "./components/update-user.component";


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    PostComponent,
    UserComponent,
    UserCardComponent,
    UserListComponent,
    ErrorComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexModule,
    FlexLayoutModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

  ],
  providers: [HttpService, ApiService, StoreSerive],
  bootstrap: [AppComponent]
})
export class AppModule {
}
