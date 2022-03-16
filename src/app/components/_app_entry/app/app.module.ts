// Core imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from 'src/app/services/data/storage.service';
import { HelperService } from 'src/app/services/util/helper';
import { NewItemComponent } from '../../_dashboard/_item_details/new-item/new-item.component';
import { LoginRegisterComponent } from '../../_intro/login-register/login-register.component';
import {NgClickOutsideModule} from 'ng-click-outside2';
import { ItemHeaderComponent } from '../../_dashboard/_item_details/item-header/item-header.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SettingsModalComponent } from '../../_dashboard/_sidebar/settings-modal/settings-modal.component';
import { GenpasswordModalComponent } from '../../_dashboard/_sidebar/genpassword-modal/genpassword-modal.component';
import { SingleFolderItemComponent } from '../../_dashboard/_sidebar/single-folder-item/single-folder-item.component';

@NgModule({

    imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      HttpClientModule,
      IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]
      }),
      NgClickOutsideModule,
      InlineSVGModule.forRoot()
    ],

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
    NewItemComponent,
    LoginRegisterComponent,
    ItemHeaderComponent,
    SettingsModalComponent,
    GenpasswordModalComponent,
    SingleFolderItemComponent,
  ],

  entryComponents: [
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormControlName,
    StorageService,
    HelperService,
  ],

  bootstrap: [AppComponent],

})

export class AppModule { }
