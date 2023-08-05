import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-badge',
  templateUrl: './card-badge.component.html',
  styleUrls: ['./card-badge.component.scss']
})
export class CardBadgeComponent {
  @Input() position: string = 'top-left'; // default is top-left
  @Input() badge!: string;
  @Input() color: string = 'primary'; // You can expand this with other options if needed

}
