import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolParams } from 'src/app/models/schoolParams';
import { SchoolsService } from 'src/app/_services/schools.service';
import { SchoolDto } from './../../models/schoolDto';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatedResult, PaginationSource } from 'src/app/models/pagination';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.scss']
})
export class ListSchoolComponent implements AfterViewInit, OnInit {

  isLoading = false;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['select', 'id', 'schoolImage', 'school_Name', 'address', 'manager', 'phone','edit', 'delete'];

  //GridDataSource: PaginatedResult<SchoolDto> = new PaginatedResult()
  schoolParams: SchoolParams = new SchoolParams();

  dataSource :  MatTableDataSource<SchoolDto> = new MatTableDataSource();
  //Paginations:PaginationSource = new PaginationSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  totalitem! : number ;



  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(()=> this.isLoading = true);
    this.loadSchools();
  }

  loadSchools() {
    //  this.schoolsService.setSchoolParams(this.schoolParams);
    this.schoolsService.getSchoolsPaging(this.schoolParams).subscribe(response => {


      this.dataSource.data = response.result;
      this.schoolParams.setPagination(response.Pagination);
     /// this.Paginations = response.Pagination.totalItems;

    //
      this.isLoading = false;



    }, error => {
      this.isLoading = false;
      console.log(error);
      //  this._snackBar.openSnackBar("School Creation was Faild");
    }
    );
  }


  pageChanged(event: PageEvent) {
    this.isLoading = true;
    console.log({ event });
    this.schoolParams.Pagination.itemsPerPage = event.pageSize;
    this.schoolParams.Pagination.currentPage = event.pageIndex;
    this.loadSchools();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.schoolParams.school_Name = filterValue;
    this.schoolParams.phone = filterValue;
    this.loadSchools();
  }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  allowMultiSelect = true;
  selection: SelectionModel<SchoolDto>;

  constructor(private schoolsService: SchoolsService,private route: ActivatedRoute, private router: Router) {
    this.selection = new SelectionModel<SchoolDto>(this.allowMultiSelect, []);
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SchoolDto): string {
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

  onEditSchool(school:SchoolDto){
    this.router.navigate(['../school/'+school.id+'/edit'], {relativeTo: this.route});
  }

  onDeleteSchool(school: SchoolDto){
    this.schoolsService.deleteSchool(school.id).subscribe(() => {
      this.loadSchools();
    });

  }


}
