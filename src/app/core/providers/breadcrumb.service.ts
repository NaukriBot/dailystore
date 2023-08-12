import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  // Create breadcrumb array based on activated route
  createBreadcrumb(routeSnapshot: ActivatedRouteSnapshot): Array<{ label: string, url: string }> {
    let breadcrumbs: Array<{ label: string, url: string }> = [];

    // Start breadcrumb generation from the root route
    this.extractBreadcrumbs(routeSnapshot.root, breadcrumbs, '');

    return breadcrumbs;
  }

  private extractBreadcrumbs(route: ActivatedRouteSnapshot, breadcrumbs: Array<{ label: string, url: string }>, url: string): void {
    const routeConfig = route.routeConfig;

    if (routeConfig) {
      // Get the breadcrumb label from route data
      const breadcrumbLabel = routeConfig.data?.['breadcrumb'];

      // Only add a breadcrumb if a label is available
      if (breadcrumbLabel) {
        // Build the breadcrumb URL if routeConfig.path is defined
        const path = routeConfig.path;
        if (path) {
          url = this.concatUrls(url, path);
        }

        // Add the breadcrumb to the array
        breadcrumbs.push({ label: breadcrumbLabel, url: url });
      }
    }

    // Recursively handle child routes
    if (route.firstChild) {
      this.extractBreadcrumbs(route.firstChild, breadcrumbs, url);
    }
  }

  private concatUrls(parentUrl: string, childUrl: string): string {
    parentUrl = parentUrl.trim();
    childUrl = childUrl.trim();

    if (parentUrl.endsWith('/')) {
      parentUrl = parentUrl.substr(0, parentUrl.length - 1);
    }

    if (childUrl.startsWith('/')) {
      childUrl = childUrl.substr(1);
    }

    return parentUrl + '/' + childUrl;
  }
}
