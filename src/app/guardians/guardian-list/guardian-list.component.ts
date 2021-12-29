import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GuardianDto } from '../../models/guardianDto';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from 'src/app/_services/guardian.service';
import { Pagination } from 'src/app/models/pagination';
import { GuardianParams } from '../../models/guardianParams';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-guardian-list',
  templateUrl: './guardian-list.component.html',
  styleUrls: ['./guardian-list.component.scss']
})
export class GuardianListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GuardianDto>;
  // dataSource: GuardianListDataSource;

  guardians!:GuardianDto[];
  pagination!:Pagination;
  guardianParams:GuardianParams= new GuardianParams;

  dataSource!: GuardianDto[];
  subscribe!: Subscription;
  id!: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nationality_Id', 'full_Name','phone', 'email', 'school_Id', 'edit'];

  constructor(private guardianService: GuardianService,private route: ActivatedRoute, private router: Router){
    // this.dataSource = new GuardianListDataSource();
  }

  ngOnInit(): void {
   this.loadGuardians();

  }

  loadGuardians(){
    this.guardianService.setGuardianParams(this.guardianParams); console.log(this.guardianParams);
    this.guardianService.getGuardians().subscribe(response=>{
      this.dataSource = response.result;
      this.pagination = response.pagination;
    })
  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onClickedRow(guardian:GuardianDto){
    this.id= guardian.id;
    console.log(guardian.id);
  }

  onAddGuardian() {
    this.router.navigate(['../guardian/new'], {relativeTo: this.route});
  }

  removeData() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditGuardian(guardian:GuardianDto){
    this.id= guardian.id;
    this.router.navigate(['../guardian/'+this.id+'/edit'], {relativeTo: this.route});
  }

}
