import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Categories } from 'src/app/categories';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: Categories[] =[];
  formCategory=new FormGroup({
    "id":new FormControl<number>(1),
    "name":new FormControl<string>(''),
    "img":new FormControl<string>('')
  });
  constructor (private cat:CategoriesService){}
   ngOnInit(): void {
      this.formCategory.controls['img'].setValue('./assets/')
       this.cat.getAllCategoryList().subscribe(data=>{
        this.categoryList=data
       })
   }
   file:string='';
   IsAdd:number=1;
   IsUpdate:number=0;
   
   onChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.file = './assets/dt/' + file.name;
    }
  }
  
   Add(){
    if (this.formCategory.valid) {
      if (this.file === '') {
       alert("Không được để trống")
        return;
      }
     this.formCategory.controls['img'].setValue(this.file);
     this.cat.AddCategory(this.formCategory.value).subscribe(res=>{
      this.ngOnInit();
      this.clearForm();
      
     });}else{
      alert("Nhập phải hợp lệ");
     }
   }
   id:any;
   Edit(index:number){
    console.log(index);
    
    console.log(this.cat.EditCategory(index));
     this.id=this.categoryList[index].id;
     this.formCategory.controls['name'].setValue(this.cat.EditCategory(index).name);
     this.file=this.cat.EditCategory(index).img;
   }
   Update(){
     this.formCategory.controls['img'].setValue(this.file);  
     this.cat.UpdateCategory(this.id,this.formCategory.value).subscribe(()=>{
      this.ngOnInit();
     })
   }
  
   Delete(index:number){
     if(confirm('Hi delete')){
      this.id=this.categoryList[index].id;
       this.cat.DeleteCategory(this.id).subscribe(res=>{
        this.ngOnInit();
       })
     }
   }
   clearForm() {
    this.formCategory.reset({
      id: 1,
      name: '',
      img: ''
    });
    this.file="";
  }
  
}
