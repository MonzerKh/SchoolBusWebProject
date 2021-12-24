import { AfterViewInit, Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SchoolsService } from 'src/app/services/schools.service';
// import { SchoolDataTableDataSource, SchoolDataTableItem } from './school-data-table-datasource';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SchoolDto } from '../../models/schoolDto';
import { Pagination } from 'src/app/models/pagination';
import { SchoolParams } from 'src/app/models/schoolParams';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SchoolDto>;

  // @Output() editModSchool!: SchoolDto;
  // @Output() editMode!: boolean;
  // dataSource!: SchoolDataTableDataSource;
  schools!: SchoolDto[];
  pagination!: Pagination;
  schoolParams: SchoolParams= new SchoolParams();

  dataSource!: SchoolDto[];
  subscribe!: Subscription;
  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'school_Name', 'manager', 'address', 'phone', 'logo', 'email', 'schoolUrl', 'edit'];


  constructor(private schoolsService: SchoolsService,private route: ActivatedRoute, private router: Router){
    // this.dataSource = new SchoolDataTableDataSource();
  }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolsService.setSchoolParams(this.schoolParams);
    this.schoolsService.getSchools().subscribe(response => {

      this.dataSource = response.result;
      this.pagination = response.pagination;
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  pageChanged(event: any) {
    this.schoolParams.pageNumber = event.page;
    this.schoolsService.setSchoolParams(this.schoolParams);
    this.loadSchools();
  }

  onClickedRow(school:SchoolDto){
    this.id= school.id;
    console.log(school.id);
  }

  onAddSchool(){
    // this.router.navigate(['../school-register/new'], {relativeTo: this.route});
  }

  onEditSchool(school:SchoolDto){
    this.id= school.id;
    this.router.navigate(['../school/'+this.id+'/edit'], {relativeTo: this.route});
  }

  findSchoolByName(school_Name: HTMLInputElement){
    this.applyeFilter(school_Name.value);
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
