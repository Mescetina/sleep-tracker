import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
  private sleepStart: Date;
  private sleepEnd: Date;

  constructor(sleepStart: Date, sleepEnd: Date, id?: string, loggedAt?: Date) {
    if (id && loggedAt) {
      super(id, loggedAt);
    } else {
      super();
    }
    this.sleepStart = sleepStart;
    this.sleepEnd = sleepEnd;
  }

  get startTime() {
    return this.sleepStart;
  }

  get endTime() {
    return this.sleepEnd;
  }

  summaryString(): string {
    const sleepStartMs = this.sleepStart.getTime();
    const sleepEndMs = this.sleepEnd.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = sleepEndMs - sleepStartMs;

    // Convert to hours and minutes
    return Math.floor(differenceMs / (1000 * 60 * 60)) + ' hrs, ' + Math.floor(differenceMs / (1000 * 60) % 60) + ' mins';
  }

  dateString(): string {
    return 'Night of ' + this.sleepStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
