import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList = [
    {
      "id":1,
      "name":"Product A",
      "weight":"200 gm",
      "price":150, 
      "discount":110,
      "imageUrl":"https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      "id":2,
      "name":"Product B",
      "weight":"110 gm",
      "price":200, 
      "discount":190,
      "imageUrl":"https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
  ]


  constructor() { }

  getProduct = () =>{
    return of(this.productList);
  }
}
