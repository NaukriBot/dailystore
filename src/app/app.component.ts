import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';

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
}
