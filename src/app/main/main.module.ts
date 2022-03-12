import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ItemsListComponent } from '../items-list/items-list.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MatInputModule ,MatFormFieldModule , MatIconModule
  ],
  declarations: [MainPage ,  ItemsListComponent , ItemDetailsComponent]
})
export class MainPageModule {}
