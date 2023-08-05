import { Component, Inject, ComponentRef, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { AddAddressComponent } from 'src/app/modules/cart/add-address/add-address.component';


@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent {
  @Input() title!: string;
  constructor(
    private dialogRef: MatDialogRef<BaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { component: any },
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    
  }
}
