import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayColumns: string[] = ["Name", 'Age', 'Gender', 'Blood_group', 'Height', 'Weight', 'Qualification', 'Job', 'Travel', 'Member_name', 'Member_blood_group' , 'Member_covid_history', 'test_date', 'result', 'symptoms'];
  displayedColumns: string[] = ["select", ...this.displayColumns];
  headerColumns: string[] = ['Name', 'Age', 'Gender', 'Blood Group', 'Height', 'Weight', 'Qualification', 'Job', 'Travel', 'Member Name', 'Member_blood_group', 'Member Covid History', 'Test Date', 'Result', 'Symptoms'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  patients:any;
  loading = false;
  oneSelected = false;
  anySelected = false;
  show = false;

  constructor(
    private patientService: PatientService,
    private cdRef : ChangeDetectorRef
  ) {
  }

  async ngOnInit(){
    this.loading=true;
    try {
      const data = await this.patientService.getPatient();
      let record = data['patient'];
      this.patients = record.data;
      console.log(this.patients);
      // this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.data = this.patients;
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    // let show = this.isShowExpand();
    // if (show != this.show) { // check if it change, tell CD update view
    //   this.show = show;
    // }
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

  checked(event){
    console.log("event");
    console.log(event);
    event.stopPropagation();
    console.log(this.selection);

    if(this.selection.selected.length>0){
      this.anySelected = true;
      console.log(this.anySelected);
    }
    if(this.selection.selected.length==1){
      this.oneSelected = true;
      console.log(this.oneSelected);
    }
    if(this.selection.selected.length==0){
      this.oneSelected = false;
      this.anySelected = false;
      console.log(this.anySelected);

    }
    console.log(this.selection.selected);
    return true;
  }

}
