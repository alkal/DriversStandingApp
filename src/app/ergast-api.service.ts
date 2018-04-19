import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ErgastApiService {

  constructor(private http: HttpClient) { }

  getDriversList(){
    const url="http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK"
    return this.http.jsonp(url,'callback');
  }

  getDriverDetails(entityId){
    const url=`http://ergast.com/api/f1/2013/drivers/${entityId}/driverStandings.json?callback=JSON_CALLBACK`;
    return this.http.jsonp(url,'callback');
  }

}
