import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, AppComponent], // ← standalone component imported here
  bootstrap: [AppComponent]
})
export class AppModule {}
