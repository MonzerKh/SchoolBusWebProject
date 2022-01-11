import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { GuardianDto } from 'src/app/models/guardianDto';
import { SchoolDto } from 'src/app/models/schoolDto';
import { StudentDto } from 'src/app/models/studentDto';
import { StudentService } from 'src/app/_services/student.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { SchoolsService } from 'src/app/_services/schools.service';
import { GuardianService } from 'src/app/_services/guardian.service';

import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateGuardianComponent } from 'src/app/guardians/create-guardian/create-guardian.component';
import { MapsAPILoader, Geocoder } from '@agm/core';
import {} from 'google-maps';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
  baseUrl = environment.apiUrl;
  school_IdControl = new FormControl();
  student: StudentDto = { id: 0 } as StudentDto;
  schools: SchoolDto[] = [];
  guardians: GuardianDto[] = [];
  editMode: boolean = false;
  studentForm!: FormGroup;
  id!: number;
  message!: string;
  lat = 40.98802959;
  lng = 28.72791767;
  zoom = 15;
  //private geoCoder :google.maps.Geocoder = new google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: SnackBarService,
    public dialog: MatDialog,
    private schoolService: SchoolsService,
    private guardianService: GuardianService,
    public mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  geocoder!: google.maps.Geocoder;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.editMode = true;
        console.log(this.editMode);
      }
      this.loadScools();
      this.loadGuardians();
      this.intitStudenForm();
    });
  }

  intitStudenForm() {
    if (this.editMode) {
      this.studentService.getstudentById(this.id).subscribe((response) => {
        this.student = response;
        this.loadForm();
        this.setCurrentLocation();
      });
    } else {
      this.loadForm();
    }
  }

  private loadForm() {
    this.studentForm = this.fb.group({
      id: [this.student.id],
      national_Number: [this.student.national_Number],
      full_Name: [this.student.full_Name],
      email: [this.student.email],
      phone: [this.student.phone],
      father: [this.student.father],
      mother: [this.student.mother],
      birthDate: [this.student.birthDate],
      personalImage: [this.student.personalImage],
      guardian_Id: [this.student.guardian_Id],
      school_Id: [this.student.school_Id],
      country: [this.student.country],
      city: [this.student.city],
      town: [this.student.town],
      street: [this.student.street],
      address: [this.student.address],
      boxNumber: [this.student.boxNumber],
      lat: [this.student.lat],
      lng: [this.student.lng],
      createdBy: [this.student.createdBy],
    });
  }

  onSubmit() {
    let studentDto: StudentDto = this.studentForm.value;
    studentDto.lat = this.student.lat;
    studentDto.lng = this.student.lng;
    this.studentService.createStudent(studentDto);
    this.message = 'the model was sent';
    this._snackBar.openSnackBar(this.message);
  }

  cancel() {
    this.studentForm.reset();
    this.router.navigate(['../student-list']);
  }

  private getStudentById(id: number) {
    this.studentService.getstudentById(id).subscribe((response) => {
      this.student = response;
    });
  }

  private loadGuardians() {
    this.guardianService.getGuardianList().subscribe((response) => {
      this.guardians = response;
    });
  }

  private loadScools() {
    this.schoolService.getSchoolList().subscribe((response) => {
      this.schools = response;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateGuardianComponent, {
      width: '800px', // height:'800px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.loadGuardians();
      console.log('dialog is closed');
    });
  }

  resetForm() {}

  ngOnDestroy() {}

  mapClicked(event: any) {
    console.log(event);
    this.student.lat = event.coords.lat;
    this.student.lng = event.coords.lng;
    this.getAddress(this.student.lat!, this.student.lng!);
  }

  markerDragEnd(event: any) {
    console.log(event);
    this.student.lat = event.coords.lat;
    this.student.lng = event.coords.lng;
    this.getAddress(this.student.lat!, this.student.lng!);
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat =
          this.student.lat! > 0 ? this.student.lat! : position.coords.latitude;
        this.lng =
          this.student.lng! > 0 ? this.student.lng! : position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results![0]) {
            this.zoom = 12;
            this.student.address = results![0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
}
