import { ChartService } from './components/service/chart-service.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  constructor(private cahrtService: ChartService) {
    this.cahrtService.initializeConnection();
  }
  ngOnDestroy(): void {
    this.cahrtService.closeConnection();
  }
  title = 'angular-chart-js';
}
