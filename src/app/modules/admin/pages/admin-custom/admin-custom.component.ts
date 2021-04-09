import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-custom',
  templateUrl: './admin-custom.component.html',
  styleUrls: ['./admin-custom.component.scss']
})
export class AdminCustomComponent implements OnInit {
  private routeSubs: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.loadRouteData();
  }

  /**
   * If getting data from service completed successfully,
   * use ActivatedRoute to reach data object
   */
  loadRouteData() {
    this.routeSubs = this.route.data.subscribe((data: any) => {
      console.log('data', data);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
