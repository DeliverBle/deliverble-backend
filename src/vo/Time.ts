import { Column } from 'typeorm';

export class Time {
  constructor(private _seconds: number, private _milliseconds: number) {
    this.seconds = _seconds;
    this.milliseconds = _milliseconds;
  }

  @Column({ type: 'integer' })
  seconds!: number;
  
  @Column({ type: 'integer' })
  milliseconds!: number;
}
