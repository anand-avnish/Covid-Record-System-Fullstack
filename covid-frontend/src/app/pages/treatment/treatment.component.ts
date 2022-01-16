import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  displayColumns: string[] = ["name","hospital_name", 'admission_no', 'start_date', 'discharge_date', 'critical_condition', 'icu_admission', 'icu_days'];
  displayedColumns: string[] = ["select", ...this.displayColumns];
  headerColumns: string[] = ["Patient Name","Hospital Name", 'Admission No', 'Admission Date', 'Discharge Date', 'Critical Condition', 'ICU Admission', 'ICU Days'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  treatments:any;
  loading = false;
  selected;
  oneSelected = false;
  id;

  constructor(
    private treatmentService: TreatmentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
  }

  async ngOnInit(){
    this.loading=true;
    this.checkbox();
    try {
      const data = await this.treatmentService.getTreatment();
      console.log(data);

      let record = data['treatments'];
      this.treatments = record.data;
      console.log(this.treatments);
      this.dataSource.data = this.treatments;
      console.log(this.dataSource);

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
    await this.router.navigate(['updateTreatment'], { relativeTo: this.activeRoute.parent ,queryParams:{hospital_id: this.selection.selected[0].hospital_id, patient_id: this.selection.selected[0].patient_id} });
  }

  async delete(){
    this.loading = true;
    this.id = this.selection.selected[0];
    const rem = {
      "hospital_id":this.id.hospital_id,
      "patient_id":this.id.patient_id
    }
    const result = await this.treatmentService.removeTreatment(rem);
    console.log(result);
    try {
      const data = await this.treatmentService.getTreatment();
      this.treatments = data['treatments'];
      // this.hospitals = record.data;
      console.log(this.treatments);
      // this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.data = this.treatments;
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
