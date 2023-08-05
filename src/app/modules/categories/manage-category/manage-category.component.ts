import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/providers';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit{
  productService = inject(ProductsService);
  dialog = inject(MatDialog);
  
  productList: any[] = [];
  // constructor(
  //   private productService: ProductsService,
  //   private dialog: MatDialog
  // ) { }
  addCategory = () =>{
    const dialogRef = this.dialog.open(AddEditCategoryComponent,{
      width: '500px',
      height: 'auto',
    });
  }
  ngOnInit(){
    this.productService.getProduct().subscribe((res)=>{
        this.productList = res;
    })  
  }
}
