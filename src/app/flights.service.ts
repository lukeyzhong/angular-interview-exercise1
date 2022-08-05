import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SearchFlight } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private baseUrl: string =
    'https://apis.qa.alaskaair.com/aag/1/guestServices/flights/?nonStopOnly=false&';
  private options = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.apiKey,
    }),
  };

  private flightList: any = [];
  private flightSbj$ = new BehaviorSubject(this.flightList);
  flightList$ = this.flightSbj$.asObservable();

  constructor(private http: HttpClient) {}

  getFlightsEndpoint(data: SearchFlight) {
    const url = Object.entries(data).reduce(
      (acc: string, [key, val]: any): string => {
        return acc + key + '=' + val + '&';
      },
      this.baseUrl
    );
    
    return this.http.get(url, this.options).pipe(
      tap((flightListFromBackEnd: Array<any>) => {
        this.flightList = [...flightListFromBackEnd];
        this.flightSbj$.next(this.flightList);
      })
    );
  }
}
