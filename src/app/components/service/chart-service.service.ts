import { EventEmitter, Injectable, Output } from '@angular/core';
import * as sr from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  @Output() notification: EventEmitter<ChartDataModel> =
    new EventEmitter<ChartDataModel>();

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

    this.connection.on('UpdateChart', (chartDataModel: ChartDataModel) => {
      this.notification.emit(chartDataModel as ChartDataModel);
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

export interface ChartDataModel {
  mark: number[];
}
