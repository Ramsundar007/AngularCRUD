import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
 title='crud-app'
  displayedColumns: string[] = [
    'id',
   'firstname',
    'lastname',
     'email',
     'dob',
     'gender',
     'education',
     'company',
     'experience',
     'package',
    'action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog ,private _empservice:EmployeeService,private _coreservice:CoreService){}
  ngOnInit(): void {
    this.getemployee();
  }
  openaddeditform(){
   const dialogref= this._dialog.open(AddEditComponent)
   dialogref.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getemployee();
      }
    }
   });
  }
  getemployee(){
    
    
    this._empservice.getemployee().subscribe({
      next:(res)=>{
       
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  deleteemplyoyee(id:any){
    
   
    this._empservice.deleteemployee(id).subscribe({
      next:(res)=>{
       
        this._coreservice.openSnackBar('Employee Deleted Successfully','done')
        this.getemployee();
      },
      error:console.log,
    });
  }
  openeditform(data:any){
  const dialogref = this._dialog.open(AddEditComponent,{
      data,
    });
    dialogref.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getemployee();
        }
      }
     })
  }
}
  

