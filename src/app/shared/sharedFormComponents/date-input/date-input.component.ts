import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, Validators } from '@angular/forms';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  @Input() label!: string;
  @Input() maxDate!: Date;
  // bsConfig: Partial<BsDatepickerConfig>;
  dateInput:Date= new Date();

  dateForm = new FormControl(new Date());
  subscriptions: Subscription[] = [];

  get value(): Date{
    return this.dateForm.value;
  }

  set value(value: Date){
    this.dateForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    // this.bsConfig = {
    //   containerClass: 'theme-red',
    //   dateInputFormat: 'DD MMMM YYYY'
    // }
    this.dateForm = new FormControl('',[Validators.required]);

        this.subscriptions.push(
      this.dateForm.valueChanges.subscribe( value=>{
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnInit(){}

  writeValue(value: any){
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.dateForm.reset();
    }
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }



  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};


  validate(_: FormControl) {
    return this.dateForm.valid ? null : { FormControlName: { valid: false } };
  }

  reset() {
  this.dateForm.reset();
  }

}
