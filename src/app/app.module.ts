import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
