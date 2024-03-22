import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authList:Users[]=[];
  id:any;
  formAuth!: FormGroup;

  // formAuth=new FormGroup({
  //   "id":new FormControl<string>(''),
  //   "email":new FormControl<string>(''),
  //   "password":new FormControl<string>(''),
  //   "role":new FormControl<number>(0)
  // });
  
  constructor(private http:HttpClient, private us:AuthService, private fb: FormBuilder){}
  ngOnInit(): void {
    this.us.getAllUserList().subscribe(data=>{
      this.authList=data;
     })
     this.formAuth = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }
  IsAdd:number=1;
  IsUpdate:number=0;
  Add(){

  }
  Update(){}
  Delete(id:any){
    if(confirm('Hi delete')){
     this.id=id;
      this.us.DeleteAuth(this.id).subscribe(res=>{
       this.ngOnInit();
      })
    }
  }
  Edit(id:number){}
  clearForm(){}
  submit(){
    const {email,password}=this.formAuth.value;
    this.us.isValid(email,password).subscribe((isValid)=>{
      if(isValid){
        alert("trùng. Không thể tạo")
      }else{
        this.us.AddUser(email,password,1).subscribe(()=>{
          alert('Tạo thành công');
          this.ngOnInit();
        })
      }
    })
  }
}
