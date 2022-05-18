import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }


  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
