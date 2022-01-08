import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BusDto } from 'src/app/models/busDto';
import { BusParams } from 'src/app/models/busParams';
import { BusService } from '../../_services/bus.service';
import { of, pipe } from 'rxjs';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  id!: number;
  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  busParams: BusParams = new BusParams();
  dataSource: MatTableDataSource<BusDto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalitem!: number;

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  allowMultiSelect = true;
  selection!: SelectionModel<BusDto>;

  displayedColumns = [
    'select',
    'id',
    'number',
    'marka',
    'capacity',
    'minimum',
    'large',
    'company',
    'edit',
    'delete',
  ];

  constructor(
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selection = new SelectionModel<BusDto>(this.allowMultiSelect, []);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(() => (this.isLoading = true));
    this.loadBuses();
  }

  private loadBuses() {
    this.busService.getBusesPaging(this.busParams).subscribe(
      (response) => {
        this.dataSource.data = response.result;
        this.busParams.setPagination(response.Pagination);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  pageChanged(event: PageEvent) {
    this.isLoading = true;
    console.log({ event });
    this.busParams.Pagination.itemsPerPage = event.pageSize;
    this.busParams.Pagination.currentPage = event.pageIndex;
    this.loadBuses();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.busParams.marka = filterValue;
    this.busParams.number = filterValue;
    this.loadBuses();
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BusDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource) {
      const numRows = this.dataSource.data.length;
      return numSelected == numRows;
    }
    return false;
  }

  onEditBus(bus: BusDto) {
    this.id = bus.id;
    this.router.navigate(['../bus/' + 'edit/' + this.id], {
      relativeTo: this.route,
    });
  }

  onDeleteBus(bus: BusDto) {
    this.busService.deleteBus(bus.id).subscribe(() => {
      this.loadBuses();
    });
  }
}
