import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/categories';
import { CategoriesService } from 'src/app/categories.service';
import { Products } from 'src/app/products';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productShop:Products[]=[];
  productShopFilter:Products[]=[];
  categories:Categories[]=[];
  seaching:string='';
  formProduct=new FormGroup({
    "id":new FormControl<number>(1),
    "productName":new FormControl<string>(''),
    "productCode":new FormControl<string>(''),
    "releaseDate":new FormControl<string>(''),
    "price":new FormControl<number>(0),
    "starRating":new FormControl<number>(5),
    "imageUrl":new FormControl<string>(''),
    "description":new FormControl<string>(''),
    'inStock':new FormControl<number>(0),
    'categoryId':new FormControl<number>(1),
  });
  constructor( private router:ActivatedRoute,private cat:CategoriesService, private prod:ProductsService){
    
  }
  file:string='';
   IsAdd:number=1;
   IsUpdate:number=0;
   id:number=1;
   categoryId:number=1;
  ngOnInit(): void {
      this.categoryId=Number(this.router.snapshot.params['id']);
      this.router.params.subscribe(params => {
        this.categoryId = Number(params['id']);
        this.prod.getAllProductListByIdCategory(this.categoryId).subscribe((data) => {
          this.productShop = data;
          this.productShopFilter=this.productShop;
        });
      });
      this.cat.getAllCategoryList().subscribe((data)=>{
        this.categories=data;
      })
  }
  resultFilter(){
    if(!this.seaching){
        this.productShopFilter=this.productShop;
    }else{
      this.productShopFilter=this.productShop.filter(list=>list?.productName.toLowerCase().includes(this.seaching.toLowerCase()));
    }
  }
  showRating(event:any){
    alert(`${event}`);
  }
  Add(){
    if (this.formProduct.valid) {
      if (this.file === '') {
        alert("Bạn chưa chọn hình ảnh")
        return;
      }
    this.formProduct.controls['imageUrl'].setValue(this.file);
    console.log(this.formProduct.value);
    
    this.prod.AddProduct(this.formProduct.value).subscribe(()=>{
      this.ngOnInit();
      this.clearForm();
    });}else{
      alert("Bạn phải nhập đầy đủ")
    }
  }
  Update(){
    this.formProduct.controls['imageUrl'].setValue(this.file);
    this.prod.UpdateProduct(this.id,this.formProduct.value).subscribe(()=>{
      this.ngOnInit();
    })
  }

  onChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.file = './assets/dt/' + file.name;
      this.formProduct.controls['imageUrl'].setValue(this.file);
    }
  }
  
  clearForm(){
    this.formProduct.reset({
      id: this.prod.AutoId(),
      productName: '',
      productCode: '',
      releaseDate: '',
      price: 0,
      starRating: 5,
      imageUrl: '',
      categoryId: this.categoryId,
      description: '',
      inStock: 0,
    })
    this.file='';
  }
  Delete(index:number){
    if(confirm('Hi delete')){
      this.prod.DeleteProduct(index).subscribe(res=>{
       this.ngOnInit();
      })
    }
  }
  Edit(id:number){
    this.id=id;
    const editedProduct = this.prod.EditProduct(id);
    if (editedProduct) {
      this.formProduct.patchValue({
        productName: editedProduct.productName,
        productCode: editedProduct.productCode,
        releaseDate: editedProduct.releaseDate,
        price: editedProduct.price,
        starRating: editedProduct.starRating,
        categoryId: editedProduct.categoryId,
        description: editedProduct.description,
        inStock: editedProduct.inStock,
      });
      this.file = editedProduct.imageUrl;
    }
  }
}
