import {BlobService} from "./blob.service";

export class FileUploadOutput{
  blob: Blob;
  filetype: string;

  constructor(blob : Blob | string, filetype : string) {
    if (typeof blob === "string") {
      var blobService = new BlobService();
      blob = blobService.cleanB64AndToBlob(blob)
    }
    this.blob = blob;
    this.filetype = filetype;
  }
}
