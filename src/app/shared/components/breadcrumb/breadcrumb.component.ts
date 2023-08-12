import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  PRIMARY_OUTLET,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/core/providers/breadcrumb.service';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  // router = inject(Router);
  // activatedRoute = inject(ActivatedRoute);
  // breadcrumbService = inject(BreadcrumbService);
  public breadcrumbs!: Breadcrumb[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService // If you plan on using this
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(
          () =>
            (this.breadcrumbs = this.createBreadcrumbs(
              this.activatedRoute.root
            ))
        )
      )
      .subscribe();
  }

  // private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
  //   const children: ActivatedRoute[] = route.children;

  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }

  //   for (const child of children) {
  //     const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
  //     if (routeURL !== '') {
  //       url += `/${routeURL}`;
  //     }

  //     breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url });
  //     return this.createBreadcrumbs(child, url, breadcrumbs);
  //   }
  //   return breadcrumbs;
  // }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const newBreadcrumb: Breadcrumb = {
        label: child.snapshot.data['breadcrumb'],
        url: url,
      };
      if (!this.breadcrumbExists(breadcrumbs, newBreadcrumb)) {
        breadcrumbs.push(newBreadcrumb);
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private breadcrumbExists(
    breadcrumbs: Breadcrumb[],
    newBreadcrumb: Breadcrumb
  ): boolean {
    return breadcrumbs.some(
      (bc) => bc.label === newBreadcrumb.label && bc.url === newBreadcrumb.url
    );
  }

  navigateTo(url: string): void {
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
