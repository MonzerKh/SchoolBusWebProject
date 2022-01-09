import { PaginationSource } from 'src/app/models/pagination';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudentDto } from 'src/app/models/studentDto';
import { StudentParams } from 'src/app/models/studentParams';
import { StudentService } from 'src/app/_services/student.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent  implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = false;
  totalitem! : number ;
  studentParams: StudentParams= new StudentParams();
  dataSource :  MatTableDataSource<StudentDto> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  student: StudentDto= {id:0} as StudentDto;
  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','id','personalImage','national_Number',  'full_Name', 'guardian_Name', 'birthDate','phone', 'email',  'edit', 'delete'];

  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router){
    this.selection = new SelectionModel<StudentDto>(this.allowMultiSelect, []);
    // this.dataSource = new SchoolDataTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(()=> this.isLoading = true);
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudentsPaging(this.studentParams).subscribe((response) => {
      this.dataSource.data = response.result;
      this.studentParams.setPagination(response.Pagination);
      this.isLoading = false;
      // this.pagination = response.Pagination;
    }, error => {
      this.isLoading = false;
      console.log(error);
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  pageChanged(event: PageEvent) {
    this.studentParams.Pagination.itemsPerPage = event.pageSize;
    this.studentParams.Pagination.currentPage = event.pageIndex;
    // this.studentService.setStudentParams(this.studentParams);
    this.loadStudents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentParams.full_Name = filterValue;
    this.studentParams.phone = filterValue;
    this.loadStudents();
  }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    allowMultiSelect = true;
    selection!: SelectionModel<StudentDto>;

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected == numRows;
    }
    return false;
  }

  // onClickedRow(student:StudentDto){
  //   this.id= student.id;
  //   console.log(student.id);
  // }

  // onAddStudent(){
  //   // this.router.navigate(['../school-register/new'], {relativeTo: this.route});
  // }

   onEditStudent(student:StudentDto){
     this.id= student.id;
     this.router.navigate(['../student/'+'edit/'+this.id], {relativeTo: this.route});
   }

  // findStudentByid(full_Name: HTMLInputElement){
  //   this.applyeFilter(full_Name.value);
  // }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onDeleteStudent(student: StudentDto){
    this.studentService.deleteStudent(student.id).subscribe(() => {
      this.loadStudents();
    });
  }
}
