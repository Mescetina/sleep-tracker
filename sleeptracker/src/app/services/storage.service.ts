import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SleepData } from '../data/sleep-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public storage: Storage) { }

  async addData(id: string, data: SleepData) {
    await this.storage.set(id, JSON.stringify(data));
  }

  async getData(id: string): Promise<SleepData> {
    const result = await this.storage.get(id);
    return JSON.parse(result);
  }

  async removeData(id: string) {
    await this.storage.remove(id);
  }
}
