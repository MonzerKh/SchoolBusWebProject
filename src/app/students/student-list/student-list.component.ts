import { PaginationSource } from 'src/app/models/pagination';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudentDto } from 'src/app/models/studentDto';
import { StudentParams } from 'src/app/models/studentParams';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent  implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentDto>;

  // @Output() editModSchool!: SchoolDto;
  // @Output() editMode!: boolean;
  // dataSource!: SchoolDataTableDataSource;
  schools!: StudentDto[];
  pagination!: PaginationSource;
  studentParams: StudentParams= new StudentParams();

  dataSource!: StudentDto[];
  subscribe!: Subscription;
  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','national_Number',  'full_Name', 'guardian_Name', 'school_Name', 'birthDate', 'full_Address', 'phone', 'email',  'edit'];







  constructor(private studentService: StudentService,private route: ActivatedRoute, private router: Router){
    // this.dataSource = new SchoolDataTableDataSource();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.setStudentParams(this.studentParams);
    this.studentService.getStudents().subscribe(response => {

      this.dataSource = response.result;
      this.pagination = response.Pagination;
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  pageChanged(event: any) {
    this.studentParams.Pagination.currentPage = event.page;
    this.studentService.setStudentParams(this.studentParams);
    this.loadStudents();
  }

  onClickedRow(student:StudentDto){
    this.id= student.id;
    console.log(student.id);
  }

  onAddStudent(){
    // this.router.navigate(['../school-register/new'], {relativeTo: this.route});
  }

  onEditStudent(student:StudentDto){
    this.id= student.id;
    this.router.navigate(['../student/'+'edit/'+this.id], {relativeTo: this.route});
  }

  findStudentByid(full_Name: HTMLInputElement){
    this.applyeFilter(full_Name.value);
  }

  applyeFilter(filterValue: string){
    filterValue= filterValue.trim();
    filterValue= filterValue.toLowerCase();
    // this.data = filterValue;
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
