import { PieChartModel } from './../pie-chart/models/pie-chart.model';
import { LineChartModel } from './../line-chart/models/line-chart.model';
import { DoughnutChartModel } from './../doughnut-chart/models/doughnut-chart.model';
import { BarChartModel } from './../bar-chart/models/bar-chart.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import * as sr from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChartServiceService {
  @Output() notification: EventEmitter<ChartModel> =
    new EventEmitter<ChartModel>();

  public connection?: sr.HubConnection;

  private getUrl(): string {
    return 'https://localhost:7108/chartHub';
  }

  initializeConnection() {
    this.connection = new sr.HubConnectionBuilder()
      .configureLogging(sr.LogLevel.Information)
      .withUrl(this.getUrl())
      .withAutomaticReconnect()
      .build();

    this.connection
      .start()
      .then(function () {
        console.log('SignalR Connected!');
      })
      .catch(function (err) {
        return console.error(err.toString());
      });

    this.connection.on('UpdateChart', (chartModel: ChartModel) => {
      this.notification.emit({ ...chartModel } as ChartModel);
    });
  }

  closeConnection() {
    if (this.connection?.state === sr.HubConnectionState.Connected) {
      this.connection.stop();
    }
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export interface ChartModel {
  barChart: BarChartModel;
  doughnutChart: DoughnutChartModel;
  lineChart: LineChartModel;
  pieChart: PieChartModel;
}
