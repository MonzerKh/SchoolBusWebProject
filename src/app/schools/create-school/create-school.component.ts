import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { SchoolsService } from '../../_services/schools.service';
import { SchoolDto } from '../../models/schoolDto';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss']
})
export class CreateSchoolComponent implements OnInit {

  id!: number;
  school: SchoolDto  = {id:0} as SchoolDto;
  createScoolForm!: FormGroup;
  editMode: boolean= false;
  message!: string;
  lat = 40.98802959;
  lng = 28.72791767;
  zoom = 15;

  geocoder!: google.maps.Geocoder;
  constructor(
    private fb: FormBuilder,
    private schoolsService: SchoolsService,
    private route: ActivatedRoute, private router: Router,
    private _snackBar: SnackBarService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];  console.log(this.id);
      if(this.id){
        this.editMode=true;
      };  console.log(this.editMode);
      this.setCurrentLocation();
      this.intitSchoolForm();
    });
  }

  private loadForm(){
    this.createScoolForm = this.fb.group({
      'id':[this.school.id],
      'school_Name': [ this.school.school_Name, Validators.required],
      'manager': [ this.school.manager, Validators.required],
      'phone': [ this.school.phone, Validators.required],
      'schoolImage': [this.school.schoolImage],
      'address': [this.school.address],
      'lat': [this.school.lat],
      'lng': [this.school.lng],
    });

  }

  private intitSchoolForm(){
    if(this.editMode){
      this.schoolsService.getSchoolById(this.id).subscribe(response=>
        { this.school= response;
          this.loadForm();

        });
    }else{
      this.loadForm();
    }
  }

  onSubmit(){
    let schoolDto: SchoolDto = this.createScoolForm.value;
    schoolDto.lat= this.school.lat;
    schoolDto.lng= this.school.lng;
    this.schoolsService.createSchool(schoolDto);
    this.message = "the model was sent";
    this._snackBar.openSnackBar(this.message);

  }

  cancel(){
    this.createScoolForm.reset();
    this.router.navigate(['../school-list']);
  }

  resetForm() {
    }

  ngOnDestroy(){

  }

  mapClicked(event: any) {
    console.log(event);
    this.school.lat = event.coords.lat;
    this.school.lng = event.coords.lng;
  }

  markerDragEnd(event: any) {
    console.log(event);
    this.school.lat = event.coords.lat;
    this.school.lng = event.coords.lng;
    this.getAddress(this.school.lat!, this.school.lng!);
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = this.school.lat! > 0 ? this.school.lat! : position.coords.latitude;
        this.lng = this.school.lng! > 0 ? this.school.lng! : position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results![0]) {
          this.zoom = 12;
          this.school.address = results![0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
