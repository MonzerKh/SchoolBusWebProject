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

@Component({
  selector: 'app-student-bus',
  templateUrl: './student-bus.component.html',
  styleUrls: ['./student-bus.component.scss']
})
export class StudentBusComponent implements OnInit {
  isLoading: boolean= false;
  busCompanies:BusCompanyDto[]=[];
  schools: SchoolDto[]=[];
  buses: BusDto[]=[];
  students: StudentDto[]=[];
  dataSource :  MatTableDataSource<StudentBusDto> = new MatTableDataSource();
  busDataSource :  MatTableDataSource<BusDto> = new MatTableDataSource();
  allowMultiSelect = true;
  selection!: SelectionModel<StudentBusDto>;

  displayedStudentColumns = ['select','full_Name', 'full_Address'];
  displayedBustColumns = ['number', 'capacity','minimum','large'];
  constructor(private studentService: StudentService,
    private schoolService: SchoolsService,
    private busService : BusService,
    private busCompanyService: BusCompanyService) {
    this.selection = new SelectionModel<StudentBusDto>(this.allowMultiSelect, []);
  }

  ngOnInit(): void {
    this.loadSchoolList();
    this.loadBusCompanyList();
  }

  private loadSchoolList(){
    this.schoolService.getSchoolList().subscribe(res=>{
      this.schools = res;
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
      console.log(this.students);
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

}
