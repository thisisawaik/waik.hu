import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from './app.module';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppModule,
    FlexLayoutServerModule,
  ],
  bootstrap: [AppServerModule],
})
export class AppServerModule { }
