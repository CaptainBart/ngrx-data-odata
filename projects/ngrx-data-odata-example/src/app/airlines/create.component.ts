import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AirlineService } from './airline.service';
import { Router } from '@angular/router';
import { Airline } from './airline';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  constructor(private airlineService: AirlineService,
              private router: Router) { }

  ngOnInit(): void {
  }

  create(airline: Airline) {
    this.airlineService.add(airline).subscribe(
      () => this.router.navigateByUrl('/airlines')
    );

  }
}
