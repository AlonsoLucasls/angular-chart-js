import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartServiceService } from '../service/chart-service.service';
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

  dataSetValue: BarChartModel[] = [];
  timerId: any;
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
    this.chartServiceService.getRandomIntInclusive(200, 4000),
    this.chartServiceService.getRandomIntInclusive(200, 4000),
    this.chartServiceService.getRandomIntInclusive(200, 4000),
    this.chartServiceService.getRandomIntInclusive(200, 4000),
    this.chartServiceService.getRandomIntInclusive(200, 4000),
  ];
  constructor(private chartServiceService: ChartServiceService) {}

  ngOnInit() {
    this.initChart();
    this.initTime();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
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

  initTime() {
    this.timerId = setInterval(() => {
      const mark1 = [
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
      ];
      const mark2 = [
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
      ];
      const mark3 = [
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
      ];
      const mark4 = [
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
        this.chartServiceService.getRandomIntInclusive(1000, 4000),
      ];
      this.chart!.chart!.data.datasets[0].data = mark1;
      this.chart!.chart!.data.datasets[1].data = mark2;
      this.chart!.chart!.data.datasets[2].data = mark3;
      this.chart!.chart!.data.datasets[3].data = mark4;
      this.chart?.chart?.update();
    }, 8000);
  }
}
