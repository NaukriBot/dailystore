import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/core/providers/breadcrumb.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  // router = inject(Router);
  // activatedRoute = inject(ActivatedRoute);
  // breadcrumbService = inject(BreadcrumbService);
  // breadcrumbs!: any;
  // ngOnInit(): void {
  //   this.generateBreadcrumbs();
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.generateBreadcrumbs();
  //   });
    
  // }

  // generateBreadcrumbs(): void {
  //   // Finding the deepest activated child route
  //   let currentRoute: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
  //   while (currentRoute.firstChild) {
  //     currentRoute = currentRoute.firstChild;
  //   }
  
  //   this.breadcrumbs = this.breadcrumbService.createBreadcrumb(currentRoute);
  //   console.log('breadcrumbs', this.breadcrumbs);
  // }
  
}
