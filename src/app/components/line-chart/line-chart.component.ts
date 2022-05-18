import { ChartServiceService } from './../service/chart-service.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
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
  timerId: any;
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
  constructor(private chartService: ChartServiceService) {}

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
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
      ];
      const mark2 = [
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
      ];
      const mark3 = [
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
      ];
      const mark4 = [
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
        this.chartService.getRandomIntInclusive(200, 8000),
      ];
      this.chart!.chart!.data.datasets[0].data = mark1;
      this.chart!.chart!.data.datasets[1].data = mark2;
      this.chart!.chart!.data.datasets[2].data = mark3;
      this.chart!.chart!.data.datasets[3].data = mark4;
      this.chart?.chart?.update();
    }, 5000);
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
