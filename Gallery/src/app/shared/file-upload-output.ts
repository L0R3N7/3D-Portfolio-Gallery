export class FileUploadOutput{
  url: string;
  filetype: string;

  constructor(url: string, filetype: string) {
    this.url = url;
    this.filetype = filetype;
  }
}
