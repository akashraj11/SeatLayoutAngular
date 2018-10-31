import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { SeatComponent } from './component/seat/seat.component';

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
