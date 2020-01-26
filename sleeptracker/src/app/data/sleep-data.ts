import { generate } from 'shortid';

export class SleepData {
  id: string;
  loggedAt: Date;

  constructor(id?: string, loggedAt?: Date) {
    this.id = id ? id : generate();
    this.loggedAt = loggedAt ? loggedAt : new Date();
  }

  summaryString(): string {
    return 'Unknown sleep data';
  }

  dateString(): string {
    return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}
