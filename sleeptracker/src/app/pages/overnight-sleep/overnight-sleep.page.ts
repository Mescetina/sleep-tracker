import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-overnight-sleep',
  templateUrl: './overnight-sleep.page.html',
  styleUrls: ['./overnight-sleep.page.scss'],
})
export class OvernightSleepPage implements OnInit {
  public displayTime = new Date();
  public tracking = false;

  private startTime = new Date();
  private endTime = new Date();

  constructor(private sleepService: SleepService) {
    setInterval(() => this.displayTime = new Date(), 6000);
  }

  ngOnInit() {
  }

  onButtonClicked() {
    if (!this.tracking) {
      this.startTime = new Date();
    } else {
      this.endTime = new Date();
      this.sleepService.logOvernightData(new OvernightSleepData(this.startTime, this.endTime));
    }
    this.tracking = !this.tracking;
  }
}
