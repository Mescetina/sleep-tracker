import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];
  private overnightDataLogStream = new Subject<OvernightSleepData>();

  constructor(private storageService: StorageService) {
    storageService.storage.ready().then(() => this.loadData());
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllOvernightData.push(sleepData);
    this.overnightDataLogStream.next(sleepData);
    this.storageService.addData(sleepData.id, sleepData);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepinessData.push(sleepData);
    this.storageService.addData(sleepData.id, sleepData);
  }

  public deleteOvernightData(sleepData: OvernightSleepData) {
    const index = SleepService.AllOvernightData.indexOf(sleepData);
    SleepService.AllOvernightData.splice(index, 1);
    this.storageService.removeData(sleepData.id);
  }

  public deleteSleepinessData(sleepData: StanfordSleepinessData) {
    const index = SleepService.AllSleepinessData.indexOf(sleepData);
    SleepService.AllSleepinessData.splice(index, 1);
    this.storageService.removeData(sleepData.id);
  }

  public getOvernightDataLogStream(): Observable<OvernightSleepData> {
    return this.overnightDataLogStream.asObservable();
  }

  private loadData() {
    this.storageService.storage.forEach(value => {
      const data = JSON.parse(value);
      if (data.loggedValue) {
        const sleepData = new StanfordSleepinessData(data.loggedValue, data.id, new Date(data.loggedAt));
        SleepService.AllSleepinessData.push(sleepData);
      } else {
        const sleepData = new OvernightSleepData(new Date(data.sleepStart), new Date(data.sleepEnd), data.id, new Date(data.loggedAt));
        SleepService.AllOvernightData.push(sleepData);
      }
    });
  }
}
