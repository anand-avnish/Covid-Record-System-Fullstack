import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {


  displayColumns: string[] = ["hospital_name", 'city', 'state', 'no_patients'];
  displayedColumns: string[] = ["select", ...this.displayColumns];
  headerColumns: string[] = ['Hospital Name', 'City', 'State', 'No of Patients'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  hospitals:any;
  loading = false;
  selected;
  oneSelected = false;
  id;

  constructor(
    private hospitalService: HospitalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
  }

  async ngOnInit(){
    this.loading=true;
    this.checkbox();
    try {
      const data = await this.hospitalService.getHospital();
      this.hospitals = data['hospital'];
      // this.hospitals = record.data;
      console.log(this.hospitals);
      // this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.data = this.hospitals;
      // console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
    this.loading = false;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checked(){
    console.log(this.selection.selected);
    return true;
  }

  async checkbox(){
    this.selection.changed.subscribe(value => {
      // console.log(value);

      if(this.selection.selected.length==1){
        // this.anySelected = true;
        this.oneSelected = true;
      }else if(this.selection.selected.length>0){
        this.oneSelected = false;
        // this.anySelected = true;
      }else{
        // this.anySelected = false;
        this.oneSelected = false;
      }
      // console.log(this.anySelected);
      console.log(this.oneSelected);
      this.selected = this.selection.selected.length;
    })
  }

  async edit(){
    this.loading = true;
    await this.router.navigate(['updateHospital'], { relativeTo: this.activeRoute.parent ,queryParams:{id: this.selection.selected[0].hospital_id} });
  }

  async delete(){
    this.loading = true;
    this.id = this.selection.selected[0].hospital_id;
    const rem = {
      "hospital_id":this.id
    }
    const result = await this.hospitalService.removeHospital(rem);
    console.log(result);
    try {
      const data = await this.hospitalService.getHospital();
      this.hospitals = data['hospital'];
      // this.hospitals = record.data;
      console.log(this.hospitals);
      // this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.data = this.hospitals;
      // console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
    this.loading = false;
  }

}
