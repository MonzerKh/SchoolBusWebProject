import { PaginationSource } from 'src/app/models/pagination';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusCompanyDto } from 'src/app/models/busCompanyDto';
import { BusCompanyParams } from 'src/app/models/busCompanyParams';

import { BusCompanyService } from 'src/app/_services/bus-company.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-bus-company-list',
  templateUrl: './bus-company-list.component.html',
  styleUrls: ['./bus-company-list.component.scss'],
})
export class BusCompanyListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  BusCompanys!: BusCompanyDto[];
  pagination!: PaginationSource;
  busCompanyParams: BusCompanyParams = new BusCompanyParams();

  dataSource: MatTableDataSource<BusCompanyDto> = new MatTableDataSource();
  subscribe!: Subscription;
  id!: number;
  isLoading = false;
  totalitem!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'company', 'address', 'phone', 'logoPath', 'webSiteUrl', 'edit','delete'];

  allowMultiSelect = true;
  selection: SelectionModel<BusCompanyDto>;

  constructor(
    private busCompanyService: BusCompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selection = new SelectionModel<BusCompanyDto>(
      this.allowMultiSelect,
      []
    );
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    Promise.resolve().then(() => (this.isLoading = true));
    this.loadBusCompanys();
  }

  loadBusCompanys() {
    this.busCompanyService
      .getBusCompanysPaging(this.busCompanyParams)
      .subscribe(
        (response) => {
          this.dataSource.data = response.result;
          this.busCompanyParams.setPagination(response.Pagination);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  ngAfterViewInit(): void {}

  pageChanged(event: any) {
    this.isLoading = true;
    this.busCompanyParams.Pagination.currentPage = event.pageIndex;
    this.busCompanyParams.Pagination.itemsPerPage = event.pageSize;
    this.loadBusCompanys();
  }

  onClickedRow(BusCompany: BusCompanyDto) {
    this.id = BusCompany.id;
    console.log(BusCompany.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.busCompanyParams.company = filterValue;
    this.busCompanyParams.phone = filterValue;
    this.loadBusCompanys();
  }

  onEditBusCompany(BusCompany: BusCompanyDto) {
    this.id = BusCompany.id;
    this.router.navigate(['../busCompany/edit/' + this.id]);
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: BusCompanyDto): string {
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

  onDeleteBusCompany(company: BusCompanyDto){
    this.busCompanyService.deleteBusCompany(company.id).subscribe(() => {
      this.loadBusCompanys();
    });
  }



}
