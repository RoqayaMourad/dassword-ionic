import { ISecurity } from './../../interfaces/isecurity';
import { Api } from './../api/api';
import { Injectable } from '@angular/core';
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { IDBTransfer, IEnctyptedDBObject } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class IPFSService {
  constructor(private api: Api) {
  }

}
