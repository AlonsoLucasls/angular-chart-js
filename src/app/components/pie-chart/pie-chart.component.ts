import { ChartServiceService } from './../service/chart-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
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
  timerId: any;
  mark1 = [
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
    this.chartService.getRandomIntInclusive(200, 10000),
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
    this.dataSetValue = [{ data: this.mark1 }];
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
      this.chart!.chart!.data.datasets[0].data = mark1;
      this.chart?.chart?.update();
    }, 7000);
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
