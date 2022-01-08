import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { DriverDto } from 'src/app/models/driverDto';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { environment } from 'src/environments/environment.prod';
import { DriverService } from '../../_services/driver.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent implements OnInit {
  baseUrl = environment.apiUrl;
  school_IdControl = new FormControl();
  driver: DriverDto = { id: 0 } as DriverDto;
  busCompanies: BusCompanyDto[]=[];
  driverForm!: FormGroup;
  editMode: boolean = false;
  id!: number;
  message!: string;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: SnackBarService,
    private DriverService: DriverService,
    private fb: FormBuilder,
    private driverService: DriverService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
        console.log(this.editMode);
      }
      this.intitDriverForm();

    });
  }

  private intitDriverForm(){
    const company$= this.http.get<BusCompanyDto[]>(this.baseUrl+ 'BusCompany/GetBusCompanyList');
    const driver$= this.driverService.getDriverById(this.id);
    if(this.editMode){
      return forkJoin([company$,driver$]).subscribe(data=>{
        this.busCompanies= data[0];
        this.driver=data[1];
        this.loadForm();
      })

    }else{
      return forkJoin([company$]).subscribe(data=>{
        this.busCompanies=data[0];
        this.loadForm();
      })

    }

  }

  private loadForm(){
    this.driverForm= this.fb.group({
      id: [this.driver.id],
      national_Number: [this.driver.national_Number],
      full_Name: [this.driver.full_Name],
      email: [this.driver.email],
      phone: [this.driver.phone],
      personalImage: [this.driver.personalImage],
      busCompany_Id: [this.driver.busCompany_Id],
      createdBy: [this.driver.createdBy],
    });
  }

  onSubmit() {
    let driverDto: DriverDto = this.driverForm.value;
    this.driverService.createDriver(driverDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.driverForm.reset();
    this.router.navigate(['../driver-list']);
  }

}
