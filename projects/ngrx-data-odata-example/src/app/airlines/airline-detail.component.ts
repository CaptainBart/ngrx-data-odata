import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Airline } from './airline';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrls: ['./airline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineDetailComponent implements OnInit, OnChanges {
  @Input() airline: Airline;
  @Output() save = new EventEmitter<Airline>();

  addMode = true;
  editingAirline: Airline = { AirlineCode: '', Name: '' };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.airline && this.airline.AirlineCode) {
      this.editingAirline = { ...this.airline };
      this.addMode = false;
    } else {
      this.editingAirline = { AirlineCode: '', Name: '' };
      this.addMode = true;
    }
  }

  saveAirline() {
    this.save.emit({...this.editingAirline});
  }
}
