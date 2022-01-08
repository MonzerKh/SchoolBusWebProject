import { SelectionModel } from '@angular/cdk/collections';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverDto } from 'src/app/models/driverDto';
import { DriverParams } from 'src/app/models/driverParams';
import { PaginationSource } from 'src/app/models/pagination';
import { DriverService } from 'src/app/_services/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = false;
  totalitem! : number ;
  drivers!: DriverDto[];
  pagination!: PaginationSource;
  driverParams: DriverParams= new DriverParams();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource :  MatTableDataSource<DriverDto> = new MatTableDataSource();
  subscribe!: Subscription;
  id!: number;

  allowMultiSelect = true;
    selection!: SelectionModel<DriverDto>;

  displayedColumns = ['select', 'id','personalImage','national_Number','full_Name','company','phone','email','edit','delete'];

  constructor(private driverService: DriverService,private route: ActivatedRoute, private router: Router) {
    this.selection = new SelectionModel<DriverDto>(this.allowMultiSelect, []);
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(()=> this.isLoading = true);
    this.loadrivers();
  }

  loadrivers() {
    this.driverService.getDriverPaging(this.driverParams).subscribe(response => {

      this.dataSource.data = response.result;
      this.driverParams.setPagination(response.Pagination);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error);
    })
  }

  ngAfterViewInit(): void {;
  }

  pageChanged(event: PageEvent) {
    this.isLoading = true;
    console.log({ event });
    this.driverParams.Pagination.itemsPerPage = event.pageSize;
    this.driverParams.Pagination.currentPage = event.pageIndex;
    this.loadrivers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.driverParams.full_Name = filterValue;
    this.driverParams.phone = filterValue;
    this.loadrivers();
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DriverDto): string {
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

  onEdiDriver(driver:DriverDto){
    this.id= driver.id;
    this.router.navigate(['../driver/'+'edit/'+this.id], {relativeTo: this.route});
  }

  onDeleteDriver(driver : DriverDto){
    this.driverService.deleteDriver(driver.id).subscribe(response=>{
      this.loadrivers();
    });

  }

}
