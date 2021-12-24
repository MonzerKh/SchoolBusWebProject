import { Component, Input, Self, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgControl, NgForm, ControlValueAccessor, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';

export interface emailInputValues{
  email: string
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements ControlValueAccessor, OnDestroy {

@Input() label!: string;
  @Input() type = 'text';

  emailInputForm: FormGroup;
  email!: FormControl;
  subscriptions: Subscription[] = [];

  matcher = new MyErrorStateMatcher();

  get value(): emailInputValues{
    return this.emailInputForm.value;
  }

  set value(value: emailInputValues){
    this.emailInputForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(@Self() public ngControl: NgControl, private fb: FormBuilder) {
    this.ngControl.valueAccessor = this;
    this.emailInputForm= this.fb.group({
      'email':['',[ Validators.required, Validators.email]],
    });
    this.subscriptions.push(
      this.emailInputForm.valueChanges.subscribe( value=>{
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(){}

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any){
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.emailInputForm.reset();
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void  {
    this.onTouched = fn;
  }


  validate(_: FormControl) {
    return this.emailInputForm.valid ? null : { email: { valid: false } };
  }

  reset() {
  this.emailInputForm.reset();
  }


}
