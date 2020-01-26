import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  public viewTitle = '';
  public currentDate = new Date();
  public eventSource = [];

  @ViewChild(CalendarComponent, {static: false}) sleepCalendar: CalendarComponent;

  constructor(private sleepService: SleepService) { }

  ngOnInit() {
    SleepService.AllOvernightData.forEach(sleepData => {
      this.eventSource.push({
        id: sleepData.id,
        title: 'Sleep Time',
        startTime: sleepData.startTime,
        endTime: sleepData.endTime,
        date: sleepData.dateString(),
        summary: sleepData.summaryString(),
        allDay: false
      });
    });
  }

  ngAfterViewInit()	{
    this.handleOvernightDataLogEvent();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  onTodaySelected() {
    this.sleepCalendar.currentDate = new Date();
  }

  onButtonClicked(sleepData: OvernightSleepData) {
    const index = this.eventSource.indexOf(sleepData);
    this.eventSource.splice(index, 1);
    this.sleepCalendar.loadEvents();
    this.sleepService.deleteOvernightData(sleepData);
  }

  private handleOvernightDataLogEvent() {
    this.sleepService.getOvernightDataLogStream().subscribe(sleepData => {
      this.eventSource.push({
        id: sleepData.id,
        title: 'Sleep Time',
        startTime: sleepData.startTime,
        endTime: sleepData.endTime,
        date: sleepData.dateString(),
        summary: sleepData.summaryString(),
        allDay: false
      });
      this.sleepCalendar.loadEvents();
    });
  }
}
