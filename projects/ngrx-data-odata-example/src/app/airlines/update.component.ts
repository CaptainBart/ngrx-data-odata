import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AirlineService } from './airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map, flatMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Airline } from './airline';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();

  public airline$ = this.route.paramMap
                    .pipe(
                      takeUntil(this.onDestroy$),
                      map(paramMap => paramMap.get('airlineCode')),
                      flatMap(airLineCode => this.airlineService.getByKey(airLineCode))
                    );

  constructor(private airlineService: AirlineService,
              private router: Router,
              private route: ActivatedRoute) {


  }

  ngOnInit(): void {
  }

  update(airline: Airline) {
    this.airlineService.update(airline).subscribe(
      () => this.router.navigateByUrl('/airlines')
    );

  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
