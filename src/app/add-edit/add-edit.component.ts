import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent  implements OnInit{
  empform:FormGroup;
education :string[]=[
  '10th',
  '12th',
  'Diploma',
  'Graduate',
  'Post Graduate'
]
constructor(private _fb:FormBuilder,private _empservice:EmployeeService,
  private _dialogref:MatDialogRef<AddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any, private _coreservice:CoreService)
  {
  this.empform=this._fb.group({
    firstname:'',
    lastname:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  });
}
ngOnInit(): void {
  this.empform.patchValue(this.data);
}
onformsubmit(){
  if(this.empform.valid){
    if(this.data){
      this._empservice.updateemployee(this.data.id,this.empform.value).subscribe({next:(val:any)=>{
        this._coreservice.openSnackBar('Employee Updated Successfully','Ok')
        this._dialogref.close(true);
      },
      error:(err) =>{
        console.error(err);
      },
        
      });
    }else{
      this._empservice.addemployee(this.empform.value).subscribe({next:(val:any)=>{
       
        this._coreservice.openSnackBar('Employee Added Successfully','done')
        this._dialogref.close(true);
      },
      error:(err) =>{
        console.error(err);
      },
        
      });
    }
    
  }
  }
}

