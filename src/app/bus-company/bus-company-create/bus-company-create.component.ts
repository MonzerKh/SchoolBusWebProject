import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusCompanyService } from 'src/app/_services/bus-company.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

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

  constructor(  private fb: FormBuilder,
                private busCompnyService: BusCompanyService,
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
      'company': [ this.busCompany.company],
      'logoPath': [ this.busCompany.logoPath],
      'phone': [ this.busCompany.phone],
      'webSiteUrl': [this.busCompany.webSiteUrl],
      'address': [this.busCompany.address],
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
