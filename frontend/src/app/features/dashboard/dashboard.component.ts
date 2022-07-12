import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [],
})
export class DashboardComponent implements OnInit {
  statistics = {
    cases: {
      resolved: {
        count: 272,
        percentage: 83,
      },
      inProccess: {
        count: 32,
        percentage: 11,
      },
      open: {
        count: 19,
        percentage: 6,
      },
    },
  };

  constructor() // private globalService: GlobalService, // private router: Router,
  // private translateService: TranslateService
  {}

  ngOnInit(): void {}
}
