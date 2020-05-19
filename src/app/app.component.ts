
import { Component } from '@angular/core';
import { ForecastService } from './services/forecast.service';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';

  constructor( private  geolocationService: GeolocationService  ){
    
  }
  /* constructor( private forecastService: ForecastService  ){
    
  } */

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.geolocationService.requestGeolocation();
    // this.forecastService.weather$.subscribe(console.log);
  }
}
