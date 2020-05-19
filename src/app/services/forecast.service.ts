import { Coords } from './../../structures/coords.structure';
import { GeolocationService } from './geolocation.service';
import { Weather } from './../../structures/weather.structure';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  
  public weatherSubject: Subject<any> = new Subject<any>();

  public weather$: Observable<any>;

  endPoint: string = "https://api.openweathermap.org/data/2.5/forecast";


  constructor(private http: HttpClient, private geolocationService: GeolocationService) { 
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.structureData));

      this.geolocationService.coords$.subscribe((coords) =>{

        this.get(coords);
      })
  }

  structureData(data: any){
    
    let minMaxPerDay = {};

    data.list.forEach(weatgerObject => {


      let date = new Date(weatgerObject.dt * 1000);

      let hours = date.getHours();
      let month = date.getMonth();
      let day = date.getDate();

      let key = `${month}-${day}`;

      let temPerDay : Weather = minMaxPerDay[key] || {
        minMaxTemp:{}
      };
     
      if(!temPerDay.cod || hours == 16){
        let source = weatgerObject.weather[0];
        temPerDay = {... temPerDay,... source};
        temPerDay.cod = source.id;
        temPerDay.name = data.city.name;
      }
      if(!temPerDay.minMaxTemp.min || ( weatgerObject.main.temp_min < temPerDay.minMaxTemp.min )){

        temPerDay.minMaxTemp.min = weatgerObject.main.temp_min;
      }
      if(!temPerDay.minMaxTemp.max || (weatgerObject.main.temp_max > temPerDay.minMaxTemp.max )){

        temPerDay.minMaxTemp.max = weatgerObject.main.temp_max;
      }
      minMaxPerDay[key] = temPerDay;

    });
    return Object.values(minMaxPerDay);
  }

  get(coords: Coords) {
    let args: string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`;
    let url = this.endPoint + args;

    /* if (isDevMode()) {
      url = "assets/forecast.json";
      // return this.http.get('assets/weather.json').subscribe(this.weatherSubject);
    } */
    this.http.get(url).subscribe(this.weatherSubject);
  }
}
