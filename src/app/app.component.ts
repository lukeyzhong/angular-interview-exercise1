import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FlightsService } from './flights.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  healthPing: Observable<string>;
  form!: FormGroup;

  dateData: Post = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now())
  };


  flightList$!: Observable<any>;

  constructor(
    private readonly flightService: FlightsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromDate: [formatDate(this.dateData.startDate, 'yyyy-MM-dd', 'en')],
      toDate: [formatDate(this.dateData.endDate, 'yyyy-MM-dd', 'en')],
      origin: [''],
      destination: [''],
    });
    this.flightList$ = this.flightService.flightList$;
  }

  onSubmit() {
    // this.flightService.getFlightsEndpoint(this.form.value).subscribe();
    console.log(this.form.value);
  }
}

export interface Post {
  startDate: Date;
  endDate: Date;
}

export interface SearchFlight {
  fromDate?: string;
  toDate?: string;
  origin?: string;
  destination?: string;
  id?: number;
}
