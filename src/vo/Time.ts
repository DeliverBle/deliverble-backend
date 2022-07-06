import { Column } from 'typeorm';

export class Time {
  constructor(private _minute: number, private _seconds: number) {
    this.minute = _minute;
    this.seconds = _seconds;
  }

  @Column({ type: 'integer' })
  minute!: number;

  @Column({ type: 'integer' })
  seconds!: number;
}
