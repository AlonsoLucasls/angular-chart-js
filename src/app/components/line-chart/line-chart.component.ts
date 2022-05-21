import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import {
  ChartDataModel,
  ChartService,
} from './../service/chart-service.service';
import { LineChartModel } from './models/line-chart.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnDestroy {
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
        text: 'Equipment Performance',
      },
    },
  };

  dataSetValue: LineChartModel[] = [];

  mark1 = [
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
  ];
  mark2 = [
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
  ];
  mark3 = [
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
  ];
  mark4 = [
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
    this.chartService.getRandomIntInclusive(200, 8000),
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
    this.dataSetValue = [
      { label: 'Mark 1', data: this.mark1, tension: 0.5 },
      { label: 'Mark 2', data: this.mark2, tension: 0.5 },
      { label: 'Mark 3', data: this.mark3, tension: 0.5 },
      { label: 'Mark 4', data: this.mark4, tension: 0.5 },
    ];
    this.factoryData = {
      labels: ['Packages', 'Writing', 'Reading', 'Oscillation', 'Delivery'],
      datasets: this.dataSetValue,
    };
  }

  upDateChart(responseData: ChartDataModel[]) {
    this.chart!.chart!.data.datasets[0].data = responseData[0].mark;
    this.chart!.chart!.data.datasets[1].data = responseData[1].mark;
    this.chart!.chart!.data.datasets[2].data = responseData[2].mark;
    this.chart!.chart!.data.datasets[3].data = responseData[3].mark;
    this.chart?.chart?.update();
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
