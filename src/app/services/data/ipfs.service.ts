import { ISecurity } from './../../interfaces/isecurity';
import { Api } from './../api/api';
import { Injectable } from '@angular/core';
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { IEnctyptedDBObject } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class IPFSService {
  constructor(private api: Api) {
  }

  async uploadFileToIPFS(type:"db"|"file",file: File, body?:{[key:string]:ISecurity}) {
    new Promise((resolve, reject) => {
      this.api.uploadFile(`ipfs/store/${type}/`, file, body).subscribe(
        (event: HttpProgressEvent) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log("== Upload Progress:", (event.loaded / event.total) * 100);
          } else if (event instanceof HttpResponse) {
            resolve(event)
          }
        },
        (e) => {
          reject(e)
        }
      )
    })
  }

  getDbFromIPFS(body?:{[key:string]:ISecurity}) {
      return this.api.post<IEnctyptedDBObject>(`ipfs/store/db/`, body)
  }


}
