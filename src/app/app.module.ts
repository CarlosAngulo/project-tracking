import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DependencyComponent } from './views/dependency/dependency.component';
import { CardComponent } from './cards/card/card.component';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { InitialsPipe } from './pipes/initials.pipe';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { JsonLoaderComponent } from './components/json-loader/json-loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TicketListComponent } from './views/ticket-list/ticket-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { FirebaseService } from './services/project-loader/firebase.service';
import { ChipItemComponent } from './components/chip-item/chip-item.component';
import { ProjectLoaderComponent } from './components/project-loader/project-loader.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UserModule } from './features/users/user.module';

@NgModule({
  declarations: [
    AppComponent,
    DependencyComponent,
    CardComponent,
    ShortNamePipe,
    InitialsPipe,
    ProgressBarComponent,
    DropdownComponent,
    JsonLoaderComponent,
    MenuComponent,
    HeaderComponent,
    TicketListComponent,
    TicketDetailComponent,
    ChipItemComponent,
    ProjectLoaderComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    FirebaseService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
