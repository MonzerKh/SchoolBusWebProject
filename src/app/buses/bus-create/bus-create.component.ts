import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusDto } from 'src/app/models/busDto';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { environment } from 'src/environments/environment.prod';
import { BusService } from '../../_services/bus.service';

@Component({
  selector: 'app-bus-create',
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.scss']
})
export class BusCreateComponent implements OnInit {

  baseUrl = environment.apiUrl;
  bus: BusDto = { id: 0 } as BusDto;
  Buses: BusDto[] = [];
  bus_Compsnys: BusCompanyDto[] = [];
  editMode: boolean = false;
  busForm!: FormGroup;
  id!: number;
  message!: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService,
    private _snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
        console.log(this.editMode);
      }
      this.intitBusForm();
    });
  }

  private intitBusForm(){
    const bus$ = this.http.get<BusDto>(
      this.baseUrl + 'Bus/GetBus/' + this.id
    );
    const bus_Compsnys$ = this.http.get<BusCompanyDto[]>(
      this.baseUrl + 'BusCompany/GetBusCompany'
    );
    if (this.editMode) {
      return forkJoin([bus$, bus_Compsnys$]).subscribe((data) => {
        this.bus = data[0];
        this.bus_Compsnys = data[1];
        this.loadForm();
      });
    }else{
      return forkJoin([bus_Compsnys$]).subscribe((data) => {
        this.bus_Compsnys = data[0];
        this.loadForm();
      });
    }

  }

  private loadForm() {
    this.busForm = this.fb.group({
      id: [this.bus.id],
      number: [this.bus.number],
      marka: [this.bus.marka],
      capacity: [this.bus.capacity],
      minimum: [this.bus.minimum],
      large: [this.bus.large],
      busCompany_Id: [this.bus.busCompany_Id],
      createdBy:[this.bus.createdBy],
    });
  }

  onSubmit() {
    let busDto: BusDto = this.busForm.value;
    this.busService.createBus(busDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.busForm.reset();
    this.router.navigate(['../bus-list']);
  }

}
