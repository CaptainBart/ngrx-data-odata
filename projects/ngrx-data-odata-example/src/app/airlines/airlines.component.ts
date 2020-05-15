import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AirlineService } from './airline.service';
import { Airline } from './airline';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlinesComponent implements OnInit {
  public airlines$ = this.airlineService.entities$;
  public isLoading$ = this.airlineService.loading$;
  public isLoaded$ = this.airlineService.loaded$;
  public totalCount$ = this.airlineService.totalCount$;

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getAll();
  }

  deleteItem(airline: Airline, evt: MouseEvent) {
    evt.cancelBubble = true;
    evt.preventDefault();

    this.airlineService.delete(airline);
  }
}
