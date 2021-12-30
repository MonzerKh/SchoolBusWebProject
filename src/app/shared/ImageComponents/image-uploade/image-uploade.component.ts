import { Component, Input, Self, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-uploade',
  templateUrl: './image-uploade.component.html',
  styleUrls: ['./image-uploade.component.scss']
})
export class ImageUploadeComponent implements ControlValueAccessor, OnInit {

  @Input() label!: string;
  @Input() ImageUrl!: string;


  selectedFile = {} as ImageSnippet;
  // SrcImage!: string;

  OnChage!:(ImageSrc:string)=>void;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
  }


  writeValue(Image: any): void {
    this.selectedFile.src =Image;
  }

  setValue(Image: any) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
   this.selectedFile.src =Image;
  }

  registerOnChange(onchange:(ImageSrc:string)=>void): void {
    this.OnChage = onchange;

  }

  registerOnTouched(fn: any): void {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
      this.OnChage(event.target.result);
      this.selectedFile.pending = false;
    });

    reader.readAsDataURL(file);
  }


}


