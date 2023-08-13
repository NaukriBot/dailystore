import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss']
})
export class ListAddressComponent {
  @Input() userAddresses: any[] = [];
}
