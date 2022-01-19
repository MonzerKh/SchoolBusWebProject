import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BusDto } from 'src/app/models/busDto';
import { SchoolDto } from 'src/app/models/schoolDto';
import { StudentDto } from 'src/app/models/studentDto';
import { SchoolsService } from 'src/app/_services/schools.service';
import { StudentService } from '../../_services/student.service';
import { BusService } from '../../_services/bus.service';
import { map } from 'rxjs/operators';
import { StudentBusDto } from 'src/app/models/studentBusDto';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusCompanyService } from 'src/app/_services/bus-company.service';
import { BulkStudentBusDto } from 'src/app/models/bulkStudentBus';
import { StudentBusService } from 'src/app/_services/student-bus.service';

@Component({
  selector: 'app-student-bus',
  templateUrl: './student-bus.component.html',
  styleUrls: ['./student-bus.component.scss']
})
export class StudentBusComponent implements OnInit {
  id!: number;
  busNumber!: string;
  isLoading: boolean= false;

  school: SchoolDto= {} as SchoolDto;

  schools: SchoolDto[]=[];

  busCompanies:BusCompanyDto[]=[];

  buses: BusDto[]=[];

  bus: BusDto= {} as BusDto;

  studentbus: StudentBusDto[]=[];

  bulksStudentBus:BulkStudentBusDto[]=[];

  bulkStudentBus:BulkStudentBusDto= {} as BulkStudentBusDto;

  message!: string;
  lat = 40.98802959;
  lng = 28.72791767;
  zoom = 13;
  geocoder!: google.maps.Geocoder;

  dataSource :  MatTableDataSource<StudentBusDto> = new MatTableDataSource();
  busDataSource :  MatTableDataSource<BusDto> = new MatTableDataSource();

  allowMultiSelect = true;
  selection!: SelectionModel<StudentBusDto>;

  displayedStudentColumns = ['select', 'id','full_Name','bus_Name', 'full_Address'];
  displayedBustColumns = ['number', 'capacity','minimum','large'];
  constructor(private studentService: StudentService,
    private schoolService: SchoolsService,
    private busService : BusService,
    private busCompanyService: BusCompanyService,
    private studentBusService: StudentBusService) {
    this.selection = new SelectionModel<StudentBusDto>(this.allowMultiSelect, []);
  }

  ngOnInit(): void {
    this.loadSchoolList();
    this.loadBusCompanyList();
  }

  private loadSchoolList(){
    this.schoolService.getSchoolList().subscribe(res=>{
      this.schools = res;
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
    })
  }

  private loadBusCompanyList(){
    this.busCompanyService.getBusCompanyList().subscribe(response=>{
      this.busCompanies= response;
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
    })
  }

  private loadStudentlist(school_Id:number){
    this.studentService.getStudentlist(school_Id).subscribe(response=>{
      this.dataSource.data= response;
      this.studentbus= response;
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
    })

  }

  private loadBuslist(busCompany_Id: number){
    this.busService.getBusist(busCompany_Id).subscribe(response=>{
      this.busDataSource.data= response;
      console.log(this.buses);
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
    })
  }

  changeSchool($event:any){
    this.loadStudentlist($event.value);
    this.schoolService.getSchoolById($event.value).subscribe(response=>{
      this.school= response;
    })
  }

  changeBusCompany($event:any){
    this.loadBuslist($event.value);
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
    console.log(this.selection);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentBusDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected == numRows;
    }
    return false;
  }

  mapClicked(event: any) {}

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(event: any){
    console.log("marker DragEnd event"+event);
  }

  setBulkStudentBus(){
    this.studentbus= this.selection.selected.slice();
    this.bulkStudentBus.students= this.studentbus;
    this.bulkStudentBus.bus= this.bus;
    this.studentBusService.createBulkStudentBus(  this.bulkStudentBus);

  }
  onClickedRow(row: BusDto){
    this.id= row.id;
    this.busService.getBusById(this.id).subscribe(response=>{
      this.bus= response;
      console.log(this.bus);
    })
  }

}
