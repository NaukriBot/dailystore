/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Injectable, Injector, ComponentRef, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root',
})
export class BaseModalService {

    private dialogRef!: MatDialogRef<any>;
    private componentRef!: ComponentRef<any>;

    constructor(private dialog: MatDialog, private injector: Injector) {
    }

    open(component: any, data: any, name: string = 'Default') {
        // this.dialogRef = this.dialog.open(BaseModalComponent, {
        //     data: { component: component }
        // });

    }

    closeDialog() {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
        if (this.componentRef) {
          this.componentRef.destroy();
        }
    }

}