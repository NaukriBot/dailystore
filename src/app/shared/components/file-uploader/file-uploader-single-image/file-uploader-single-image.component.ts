import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fileUploaderExtender } from '../file-uploader';
import { IFileUpload } from 'src/app/core/interface/file-upload.interface';
import { checkForChanges } from 'src/app/core/providers';

@Component({
  selector: 'app-file-uploader-single-image',
  templateUrl: './file-uploader-single-image.component.html',
  styleUrls: ['./file-uploader-single-image.component.scss']
})
export class FileUploaderSingleImageComponent
  extends fileUploaderExtender
  implements OnInit, OnChanges
{
  @Input() override options!: IFileUpload;
  @Input() enableDownload?: boolean;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  override pending = false;
  imageUrl: any;
  mediaUrl: any;
  fileNotSelected = false;
  fileUrl: any;
  base64 = true;
  constructor() {
    super();
    this.fs = this.fileResult;
  }
  getUploadIconUrl = (iconUrl: string) =>
    iconUrl ?? 'assets/img/icon_upload.svg';
  ngOnInit() {}

  onChange(fileInput: any) {
    const file: File = fileInput.files[0];
    if (this.checkErrorMessage(file)) {
      this.pending = true;
      this.uploadFile(file, this.options.groupId).subscribe((res: any) => {
        const fileUrl = res.data;
        this.options.imageUrl = fileUrl;
        this.pending = false;
        this.emitFileResult({
          mediaFileName: file.name,
          mediaContentType: file.type,
          mediaType: this.options.type,
          height: this.options.height,
          mediaFileSize: file.size,
          mediaUrl: fileUrl,
        });
        fileInput.value = null;
      },(err) => {
        //error
        fileInput.value = null;
        this.pending = false;
        console.log('File Upload Error');
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (checkForChanges('options', changes, 'imageUrl')) {
      this.imageUrl = this.options.imageUrl =
        changes['options'].currentValue.imageUrl;
    }
  }
}
