import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorDto } from 'src/app/models/supervisorDto';
import { SupervisorParams } from 'src/app/models/supervisorParams';
import { SupervisorService } from 'src/app/_services/supervisor.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-supervisor-list',
  templateUrl: './supervisor-list.component.html',
  styleUrls: ['./supervisor-list.component.scss']
})
export class SupervisorListComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalitem! : number ;
  supervisorParams: SupervisorParams= new SupervisorParams();
  dataSource :  MatTableDataSource<SupervisorDto> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','id','full_Name', 'phone', 'email','school_Name', 'full_Address',  'edit', 'delete'];

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    allowMultiSelect = true;
    selection!: SelectionModel<SupervisorDto>;

  constructor(private supervisorService: SupervisorService,private route: ActivatedRoute, private router: Router){
    this.selection = new SelectionModel<SupervisorDto>(this.allowMultiSelect, []);
    // this.dataSource = new SchoolDataTableDataSource();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(()=> this.isLoading = true);
    this.loadSupervisors();
  }

  loadSupervisors() {
    this.supervisorService.getSupervisorPaging(this.supervisorParams).subscribe((response) => {
      this.dataSource.data = response.result;
      this.supervisorParams.setPagination(response.Pagination);
      this.isLoading = false;
      // this.pagination = response.Pagination;
    }, error => {
      this.isLoading = false;
      console.log(error);
    })
  }

  pageChanged(event: PageEvent) {
    this.supervisorParams.Pagination.itemsPerPage = event.pageSize;
    this.supervisorParams.Pagination.currentPage = event.pageIndex;
    // this.loadSupervisors.setSupervisorParams(this.supervisorParams);
    this.loadSupervisors();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.supervisorParams.full_Name = filterValue;
    this.supervisorParams.phone = filterValue;
    this.loadSupervisors();
  }

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

  onEditSupervisor(supervisor: SupervisorDto){
    this.id= supervisor.id;
    this.router.navigate(['../supervisor/'+'edit/'+this.id], {relativeTo: this.route});
  }

  checkboxLabel(row?: SupervisorDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onDeleteSupervisor(superviser: SupervisorDto){
    this.supervisorService.deleteSupervisor(superviser.id).subscribe(() => {
      this.loadSupervisors();
    });
  }


}
