import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, /*ChangeDetectionStrategy,*/ NgZone } from '@angular/core';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { CompressorService } from 'src/app/services/compressor.service';
// import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges{

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  ngDoCheck() {
    console.log('ALC. AvatarComponent ngDoCheck called')
  }

  photoUrl: string;
  hasPhoto: boolean = false;
  uploading: boolean = false;
  s3ImageFile: any = null;
  s3ImagePath: string = "avatar";
  errorMessage: string;
  previewClass = "app-avatar-upload";

  private _storageOptions: any = { 'level': 'private' };
  private _previewClassIdle = "app-avatar-upload";
  private _previewClassOver = "app-avatar-upload-dragover"

  @Input()
  set url(url: string) {
    this.photoUrl = url;
    this.hasPhoto = true;
  }

  @Input()
  set storageOptions(storageOptions: any){
    this._storageOptions = Object.assign(this._storageOptions, storageOptions);
  }

  @Input()
  set path(path: string){
    this.s3ImagePath = path;
  }

  @Input()
  set data(data: any) {
    this.photoUrl = data.url;
    this.s3ImagePath = data.path;
    this._storageOptions = Object.assign(this._storageOptions, data.storageOptions);
    this.hasPhoto = true;
  }

  @Output()
  picked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  loaded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  uploaded: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  removed: EventEmitter<null> = new EventEmitter<null>();

  constructor( private notification: NotificationService,
               private compressor: CompressorService,
               private _ref: ChangeDetectorRef,
               private _zone: NgZone) {}

  pick(evt) {
    let file = null;
    if (evt.target.files) {
      file = evt.target.files[0];
    }
    if (!file && evt.dataTransfer.files) {
      file = evt.dataTransfer.files[0];
    }
    if (!file) { return; }
    const isImage = file.type.split('/')[0] === 'image';
    if (!isImage) {
      this.previewClass = this._previewClassIdle;
      return this.notification.show('Only images are allowed.');
    }
    if (!this._storageOptions.contentType) {
      this._storageOptions.contentType = file.type;
    }
    // console.log('file size: ', file.size);
    this.picked.emit(file);
    this.compressor.compress(file).subscribe(
      (file: File) => {
        const { name, size, type } = file;
        // console.log('compressed size: ', size);
        const fileName = file.name.split('.');
        const fileExt = fileName[fileName.length - 1];
        this.s3ImagePath = `${this.s3ImagePath}/picture.${fileExt}`
        this.s3ImageFile = file;
        const that = this;
        const reader = new FileReader();
        reader.onload = function(e) {
          const target: any = e.target;
          const url = target.result;
          that.photoUrl = url;
          that.hasPhoto = true;
          // FileReader executes outside of NgZone. Emit update event and return execution back to NgZone
          that._zone.run(()=>{
            that.loaded.emit(url);
          })
          that.uploadFile();
        };
        reader.readAsDataURL(file);
        //ALC. unsuccessful implementation of the article javascript - Angular 2/4 FileReader Service - Stack Overflow https://stackoverflow.com/questions/47062994/angular-2-4-filereader-service
        /*this.uploadImage(file).subscribe((url: string) => {
          // Do what you want with the image here
          this.photoUrl = url;
          this.hasPhoto = true;
          this.loaded.emit(url);
        });*/
      }
    );
  }

  uploadFile() {
  	this.uploading = true;
  	Storage.put(
  			this.s3ImagePath,
  			this.s3ImageFile, this._storageOptions)
		.then ( (result:any) => {
      this.uploaded.emit(result);
			this.completeFileUpload();
			this._ref.reattach();
		})
		.catch( error => {
			this.completeFileUpload(error);
		});
  }

  completeFileUpload(error?:any) {
  	if (error) {
  		return this._setError(error);
  	}
    this.uploading = false;
    // this.previewClass = "app-avatar-upload1"
  }

  onPhotoError(e: Event) {
    this.hasPhoto = false;
    console.log('onPhotoError event='+ e.type);
  }

  onAlertClose() {
    this._setError(null);
  }

  onDrop(event) {
    event.preventDefault();
    this.pick(event);
  }

  onDragover(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.previewClass = this._previewClassOver;
  }

  onDragout(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.previewClass = this._previewClassIdle;
  }

  onRemove (event: Event) {
    this.removed.emit();
    this.hasPhoto=false
  }

  _setError(err) {
    if (!err) {
      this.errorMessage = null;
      return;
    }
    this.errorMessage = err.message || err;
  }

  //ALC. unsuccessful implementation of the article javascript - Angular 2/4 FileReader Service - Stack Overflow https://stackoverflow.com/questions/47062994/angular-2-4-filereader-service
  /*uploadImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Observable( (observer: Observer<string | ArrayBuffer>) => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }*/
}
