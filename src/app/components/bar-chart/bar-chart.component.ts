import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ChartService } from '../service/chart-service.service';
import { ChartDataModel } from './../service/chart-service.service';
import { BarChartModel } from './models/bar-chart.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
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
        text: 'Equipment Performance Average',
      },
    },
  };

  subscription?: Subscription;

  dataSetValue: BarChartModel[] = [];

  mark1 = [
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
  ];
  mark2 = [
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
  ];
  mark3 = [
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
  ];
  mark4 = [
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
    this.chartServiceService.getRandomIntInclusive(100, 4000),
  ];
  constructor(private chartServiceService: ChartService) {
    this.subscription = this.chartServiceService.notification.subscribe(
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
}
