import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
    selector: 'side-bar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    title = 'webapp';
    @ViewChild('sidenav') sidenav!: MatSidenav;

    constructor() {
    }

    ngOnInit() {

    }


    toggleSidenav() {
        this.sidenav.toggle();
    }

}
