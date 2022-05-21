import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import {
  ChartDataModel,
  ChartService,
} from './../service/chart-service.service';
import { PieChartModel } from './models/pie-chart.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  factoryData: ChartData = {
    labels: ['Packages', 'Writing', 'Reading', 'Oscillation', 'Delivery'],
    datasets: [],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'All Performance Info',
      },
    },
  };

  dataSetValue: PieChartModel[] = [];

  mark1 = [
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
  ];

  subscription?: Subscription;

  constructor(private chartService: ChartService) {
    this.subscription = this.chartService.notification.subscribe(
      (response: ChartDataModel[]) => {
        if (response) {
          this.upDateChart(response);
        }
      }
    );
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initChart() {
    this.dataSetValue = [{ data: this.mark1 }];
    this.factoryData = {
      labels: ['Packages', 'Writing', 'Reading', 'Oscillation', 'Delivery'],
      datasets: this.dataSetValue,
    };
  }

  upDateChart(responseData: ChartDataModel[]) {
    this.chart!.chart!.data.datasets[0].data = responseData[2].mark;
    this.chart?.chart?.update();
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
