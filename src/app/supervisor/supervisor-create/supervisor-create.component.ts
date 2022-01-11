import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SchoolDto } from 'src/app/models/schoolDto';
import { SupervisorDto } from 'src/app/models/supervisorDto';
import { SchoolsService } from 'src/app/_services/schools.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { SupervisorService } from 'src/app/_services/supervisor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supervisor-create',
  templateUrl: './supervisor-create.component.html',
  styleUrls: ['./supervisor-create.component.scss']
})
export class SupervisorCreateComponent implements OnInit {

  baseUrl = environment.apiUrl;
  supervisor: SupervisorDto = { id: 0 } as SupervisorDto;
  schools: SchoolDto[] = [];
  supervisors: SupervisorDto[] = [];
  editMode: boolean = false;
  supervisorForm!: FormGroup;
  id!: number;
  message!: string;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: SnackBarService,
    private schoolService: SchoolsService,
    private supervisorService:SupervisorService
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
        console.log(this.editMode);
      }
      this.intitStudenForm();
    });
  }

  private intitStudenForm(){
    const supervisor$ = this.http.get<SupervisorDto>(
      this.baseUrl + 'Supervisor/GetSupervisor/' + this.id
    );
    const schools$ = this.http.get<SchoolDto[]>(
      this.baseUrl + 'School/GetSchoolList'
    );
    if (this.editMode) {
      return forkJoin([supervisor$, schools$]).subscribe((data) => {
        this.supervisor = data[0];
        this.schools = data[1];
        this.loadForm();
      });

    }else{
      return forkJoin([schools$]).subscribe((data) => {
        this.schools = data[0];
        this.loadForm();
      });

    }

  }

  private loadForm() {
    this.supervisorForm = this.fb.group({
      id: [this.supervisor.id],
      full_Name: [this.supervisor.full_Name],
      email: [this.supervisor.email],
      phone: [this.supervisor.phone],
      school_Id: [this.supervisor.school_Id],
      country: [this.supervisor.country],
      city: [this.supervisor.city],
      town: [this.supervisor.town],
      street: [this.supervisor.street],
      address: [this.supervisor.address],
      boxNumber: [this.supervisor.boxNumber],
      createdBy:[this.supervisor.createdBy],
    });
  }

  onSubmit() {
    let supervisorDto: SupervisorDto = this.supervisorForm.value;
    this.supervisorService.createStudent(supervisorDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.supervisorForm.reset();
    this.router.navigate(['../supervisor-list']);
  }

}
