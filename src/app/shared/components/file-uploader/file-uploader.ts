import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventEmitter, Injectable, Input } from '@angular/core';
import { IFileUpload } from 'src/app/core/interface/file-upload.interface';


export const DEFAULT_POST_URL = '/api/files';
@Injectable()
export class FileUploader {
  constructor(
    
  ) {}

  public uploadFile(file: File, groupId?: string): Observable<any> {
    const fileData = new FormData();

    fileData.append('file', file);
    const httpUploadOptions = {
      headers: new HttpHeaders({}),
    };
    // ?groupId=${groupId}
    // return this.http.post(`${DEFAULT_POST_URL}`, fileData, httpUploadOptions);
    return of('')
  }
  delete() {}
}

@Injectable()
export class fileUploaderExtender extends FileUploader {
  @Input() options!: IFileUpload;
  fs!: EventEmitter<any>;
  pending = false;
  fileInput: any;
  errorMessage: any;
  constructor() {
    super();
  }
  emitFileResult = (obj: any) => {
    if (this.options.dataUrl) {
      this.fs.emit(obj.mediaDataUrl);
    } else {
      this.fs.emit(obj);
    }
  };
  checkErrorMessage = (file: any) => {
    const maxSize = this.options.maxSize;
    if (maxSize && file.size > maxSize) {
      // show error
      this.errorMessage = `File size is big. Please upload below ${ maxSize } .`;
      return;
    }
    return true;
  };
}
