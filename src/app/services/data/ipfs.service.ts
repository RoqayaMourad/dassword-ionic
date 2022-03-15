import { Api } from './../api/api';
import { Injectable } from '@angular/core';
import { HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IPFSService {
  constructor(private api: Api) {
  }

  async uploadFileToIPFS(file: File) {
    new Promise((resolve, reject) => {
      this.api.uploadFile("ipfs/store/", file).subscribe(
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


}
