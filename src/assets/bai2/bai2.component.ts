import { Component } from '@angular/core';

@Component({
  selector: 'app-bai2',
  templateUrl: './bai2.component.html',
  styleUrls: ['./bai2.component.css'],
})
export class Bai2Component {
  products: any[] = [
    {
      id: 1,
      name: 'Đồng hồ thụy sỹ',
      image: 'assets/images/1001.jpg',
      price: 1200,
      incart: 1,
      total: 0,
    },
    {
      id: 2,
      name: 'Dell Star X',
      image: 'assets/images/1003.jpg',
      price: 700,
      incart: 1,
      total: 0,
    },
    {
      id: 3,
      name: 'Sony Vaio 2017',
      image: 'assets/images/1004.jpg',
      price: 1700,
      incart: 1,
      total: 0,
    },
    {
      id: 4,
      name: 'Máy ảnh Canon',
      image: 'assets/images/1005.jpg',
      price: 300,
      incart: 1,
      total: 0,
    },
    {
      id: 5,
      name: 'Vòng cưới France',
      image: 'assets/images/1009.jpg',
      price: 7000,
      incart: 1,
      total: 0,
    },
    {
      id: 6,
      name: 'Motorola thế hệ 5',
      image: 'assets/images/1011.jpg',
      price: 900,
      incart: 1,
      total: 0,
    },
    {
      id: 7,
      name: 'Mũ cao bồi Mexico',
      image: 'assets/images/1014.jpg',
      price: 100,
      incart: 1,
      total: 0,
    },
    {
      id: 8,
      name: 'Nước hoa Korea',
      image: 'assets/images/1023.jpg',
      price: 600,
      incart: 1,
      total: 0,
    },
  ];
  cart: any[] = [];
  searching: string = '';
  tongtien: number = 0;
  addCart(item: any) {
    var flag = false;
    if (this.cart.length == 0) {
      flag = false;
    } else {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == item.id) {
          flag = true;
        }
      }
    }
    if (flag == false) {
      this.cart.push(item);
    } else {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == item.id) {
          this.cart[i].incart++;
        }
      }
    }
  }
  filterName() {
    if (this.searching == null) {
      return this.products;
    } else {
      if (this.searching) {
        //có
        console.log(this.searching);
        console.log(this.searching.toUpperCase().split(' '));
        return this.products.filter((item) => {
          return this.searching
            .toUpperCase()
            .split(' ')
            .every((v) => item.name.toUpperCase().includes(v));
        });
      } else {
        return this.products;
      }
    }
  }
  increment(i: number) {
    this.cart[i].incart++;
  }
  
  decrement(i: number) {
    if (this.cart[i].incart > 1) {
      this.cart[i].incart--;
    }
  }
  
  Delete(i: number) {
    this.cart.splice(i, 1);
  }
  
  itemcount() {
    return this.cart.reduce((acc, item) => acc + item.incart, 0);
  }
  
  sumTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.incart, 0);
  }
  DeleteAll() {
    this.cart = [];
  }
  
}
