import { Component, Input, Self, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgControl, FormGroup, FormBuilder, ControlValueAccessor, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements ControlValueAccessor, OnDestroy {

  @Input() label!: string;
  @Input() type = 'text';

  textInput:FormControl;
  subscriptions: Subscription[] = [];

  get value():string{
    return this.textInput.value;
  }

  set value(value: string){
    this.textInput.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(@Self() public ngControl: NgControl, private fb: FormBuilder) {
    this.ngControl.valueAccessor = this;

    this.textInput= new FormControl('', Validators.required)

    this.subscriptions.push(
      this.textInput.valueChanges.subscribe( value=>{
        this.onChange(value);
        this.onTouched();

      })
    );
  }

  ngOnInit(){}

  onChange: any = () => {};
  onTouched: any = () => {};


  writeValue(value: any){
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.textInput.reset();
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void  {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.textInput.valid ? null : { textInput: { valid: false } };
  }

  reset() {
  this.textInput.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
