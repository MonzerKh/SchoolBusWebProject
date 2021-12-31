import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusCompanyService } from 'src/app/services/bus-company.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-bus-company-create',
  templateUrl: './bus-company-create.component.html',
  styleUrls: ['./bus-company-create.component.scss']
})
export class BusCompanyCreateComponent implements OnInit {

  busCompany: BusCompanyDto  = {id:0} as BusCompanyDto;
  editMode: boolean= false;
  id!: number;
  BusCompanyForm!: FormGroup;
  message!: string;

  constructor(private fb: FormBuilder, private busCompnyService: BusCompanyService,
              private route: ActivatedRoute, private router: Router,
              private _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];  console.log(this.id);
      if(this.id){
        this.editMode=true;
      };  console.log(this.editMode);
      this.intitBusCompanyForm();
    });
  }

  private loadForm(){
    this.BusCompanyForm = this.fb.group({
      'id':[this.busCompany.id],
      'company': [ this.busCompany.company, Validators.required],
      'logoPath': [ this.busCompany.logoPath, Validators.required],
      'phone': [ this.busCompany.phone, Validators.required],
      'webSiteUrl': [this.busCompany.webSiteUrl, Validators.required],
      'address': [this.busCompany.address, Validators.required],
      'imagePath': [],
      'itemPath': []
    });

  }

  private intitBusCompanyForm(){
    if(this.editMode){
      this.busCompnyService.getBusCompanyById(this.id).subscribe(response=>
        { this.busCompany= response;
          this.loadForm();

        });
    }else{
      this.loadForm();
    }
  }

  onSubmit(){
    let BusCompanyDto: BusCompanyDto = this.BusCompanyForm.value;
    this.busCompnyService.createBusCompany(BusCompanyDto);
    console.log(BusCompanyDto);
  }

  cancel(){
    this.BusCompanyForm.reset();
    this.router.navigate(['../busCompany-list']);
  }

  resetForm() {
    }

  ngOnDestroy(){

  }

}
