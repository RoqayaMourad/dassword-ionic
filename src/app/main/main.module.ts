import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ItemsListComponent } from '../items-list/items-list.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,

  ],
  declarations: [MainPage ,  ItemsListComponent , ItemDetailsComponent]
})
export class MainPageModule {}
