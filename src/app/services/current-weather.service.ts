import { GeolocationService } from './geolocation.service';
import { Weather } from './../../structures/weather.structure';
import { Injectable, isDevMode } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Coords } from "../../structures/coords.structure";

@Injectable({
  providedIn: "root",
})
export class CurrentWeatherService {
  public weatherSubject: Subject<any> = new Subject<any>();

  public weather$: Observable<any>;

  endPoint: string = "https://api.openweathermap.org/data/2.5/weather";

  constructor(private http: HttpClient, public geolocationService: GeolocationService) {
    this.weather$ = this.weatherSubject.asObservable().pipe(map((data: any) => {
      let mainWeather = data.weather[0];
      let weather : Weather = {
        name: data.name,
        cod: data.cod,
        temp: data.main.temp,
        ... mainWeather

      };
      return weather;
    }));

    this.geolocationService.coords$.subscribe((coords) =>{

      this.get(coords);
    })
   
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endPoint + args;

   /*  if (isDevMode()) {
      url = "assets/weather.json";
      // return this.http.get('assets/weather.json').subscribe(this.weatherSubject);
    } */
    this.http.get(url).subscribe(this.weatherSubject);
  }
}

/* Subject  = Observable y Observer */
