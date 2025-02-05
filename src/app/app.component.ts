import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { DateFilterModule,ModuleRegistry,NumberFilterModule,TextFilterModule,ValidationModule} from "ag-grid-community";
import { CustomFilterModule } from 'ag-grid-community';
import { RowSelectionModule } from 'ag-grid-community';
import { ColumnMenuModule,ColumnsToolPanelModule,PivotModule} from "ag-grid-enterprise";
import { TextEditorModule } from 'ag-grid-community';
import { NumberEditorModule } from 'ag-grid-community';
import { PaginationModule } from 'ag-grid-community';
import { json } from 'node:stream/consumers';


ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  RowSelectionModule,
  ClientSideRowModelModule,
  ValidationModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  PivotModule,
  TextEditorModule,
  NumberEditorModule,
  PaginationModule
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridModule, CommonModule, ],
  templateUrl: './app.component.html' ,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app';
  isBrowser = false;
  isEditMode = false;


  rowData = [
    {id : 997, ruleName: "2DS–Trace Changes", active: "Y",type: "Match", subtype: "2DS–Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    {id : 996, ruleName: "Trace Changes", active: "Y",type: "Match", subtype: "2DS–Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" },
    {id : 986, ruleName: "File -Monitor", active: "Y",type: "Match", subtype: "1DS – File Monitor", domain: "", impacted: 57994, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    {id : 985, ruleName: "testreve1", active: "Y",type: "Match", subtype: "1DS – File Monitor", domain: "", impacted: 13773, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" }
  ];

  colDefs: ColDef[]=[
    {field:"id", headerName: "Id", filter: true, checkboxSelection: true, editable: true, enableRowGroup: true, enablePivot: true, cellRenderer: true},
    {field: "ruleName", headerName: "Rule Name", filter: true, editable: true},
    {field: "active", headerName: "Is Active", filter: true, editable: true},
    {field: "type",headerName: "Type", filter: true, editable: true},
    {field: "subtype", headerName: "Subtype", filter: true, editable: true},
    {field: "domain", headerName: "Domain", filter: true, editable: true},
    {field: "impacted", headerName: "Impacted", filter: true, editable: true},
    {field: "favourite", headerName: "Favourite", filter: true, editable: true},
    {field: "scheduled", headerName: "Scheduled", filter: true, editable: true},
    {field: "lastScheduledDate", headerName: "Last Scheduled Date", filter: true, editable: true},
    {field: "alert", headerName: "Alert", filter: true, editable: true},
  ]

  modules: any[] = [ClientSideRowModelModule, CustomFilterModule, ];
  gridApi: any;
  gridColumnApi: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    console.log('it is working')
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedData = localStorage.getItem('rowData');
      if (storedData) {
        this.rowData = JSON.parse(storedData);
        console.log('Loaded from localStorage:', this.rowData);
      }
    }
  }

  onSave(){
    
    if(this.isEditMode){
      console.log('Data updated:', this.rowData)
    }else{
      console.log('Data Saved:', this.rowData)
      localStorage.setItem('rowData', JSON.stringify(this.rowData))
    }

    this.isEditMode = !this.isEditMode;
  }
  
  onGridReady(event: any): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    console.log('Grid ready');
  }

}
