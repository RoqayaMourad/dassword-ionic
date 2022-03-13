// Core imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// Material imports
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ItemsListComponent } from '../../_dashboard/_items-list/items-list/items-list.component';
import { ItemDetailsComponent } from '../../_dashboard/_item_details/item-details/item-details.component';
import { MainPage } from '../main/main.page';
import { SingleListItemComponent } from '../../_dashboard/_items-list/single-list-item/single-list-item.component';
import { ItemsListSearchComponent } from '../../_dashboard/_items-list/items-list-search/items-list-search.component';
import { SidebarListComponent } from '../../_dashboard/_sidebar/sidebar-list/sidebar-list.component';
import { SingleMenuItemComponent } from '../../_dashboard/_sidebar/single-menu-item/single-menu-item.component';
import { SidebarNoticeComponent } from '../../_dashboard/_sidebar/sidebar-notice/sidebar-notice.component';
import { InputFieldComponent } from '../../_shared/input-field/input-field.component';

@NgModule({

  declarations: [
    AppComponent,
    MainPage,
    ItemsListComponent,
    ItemDetailsComponent,
    SingleListItemComponent,
    ItemsListSearchComponent,
    SidebarListComponent,
    SingleMenuItemComponent,
    SidebarNoticeComponent,
    InputFieldComponent,
  ],

  entryComponents: [
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],

  bootstrap: [AppComponent],

})

export class AppModule { }