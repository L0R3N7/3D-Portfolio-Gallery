import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor() { }

  cleanB64AndToBlob(b64Data: string){
    var strArr = b64Data.split(/[,;:]/);
    if (strArr[0] != 'data' || strArr[2] != 'base64'){console.error("something wrong here" + strArr)}
    return this.b64ToBlob(strArr[3], strArr[1]);
  }

  b64ToBlob(b64Data : string, contentType='', sliceSize=512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  blobToBase64(blob : Blob){
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString() ?? "");
      reader.readAsDataURL(blob);
    });
  }
}
