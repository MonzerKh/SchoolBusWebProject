import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GuardianDto } from '../../models/guardianDto';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'src/app/_services/guardian.service';
import { PaginationSource } from 'src/app/models/pagination';
import { GuardianParams } from '../../models/guardianParams';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-guardian-list',
  templateUrl: './guardian-list.component.html',
  styleUrls: ['./guardian-list.component.scss']
})
export class GuardianListComponent implements AfterViewInit {
  id!: number;
  isLoading = false;
  totalitem! : number ;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  guardianParams: GuardianParams= new GuardianParams;
  dataSource :  MatTableDataSource<GuardianDto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // pagination!:PaginationSource;

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  allowMultiSelect = true;
  selection!: SelectionModel<GuardianDto>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','id','nationality_Id', 'full_Name','phone', 'email', 'school_Id', 'edit', 'delete'];

  constructor(private guardianService: GuardianService,
              private route: ActivatedRoute,
              private router: Router){
    this.selection = new SelectionModel<GuardianDto>(this.allowMultiSelect, []);
    // this.dataSource = new GuardianListDataSource();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(()=> this.isLoading = true);
    this.loadGuardians();

  }

  loadGuardians(){
    this.guardianService.getGuardiansPaging(this.guardianParams).subscribe((response) => {
      this.dataSource.data = response.result;
      this.guardianParams.setPagination(response.Pagination);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error);
    })
  }


  pageChanged(event: PageEvent) {
    this.isLoading = true;
    console.log({ event });
    this.guardianParams.Pagination.itemsPerPage = event.pageSize;
    this.guardianParams.Pagination.currentPage = event.pageIndex;
    this.loadGuardians();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.guardianParams.full_Name = filterValue;
    this.guardianParams.phone = filterValue;
    this.loadGuardians();
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

  onEditGuardian(guardian:GuardianDto){
    this.id= guardian.id;
    this.router.navigate(['../guardian/'+this.id+'/edit'], {relativeTo: this.route});
  }

  checkboxLabel(row?: GuardianDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onDeleteGuardian(guardian : GuardianDto){
    this.guardianService.deleteGuardian(guardian.id).subscribe(response=>{
      this.loadGuardians();
    });
  }

}
