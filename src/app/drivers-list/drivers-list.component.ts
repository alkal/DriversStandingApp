import { Component,Input, Output,EventEmitter } from '@angular/core';
import { ErgastApiService } from '../ergast-api.service';
import {Sort} from '@angular/material';


@Component({
  selector: 'drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent{

  @Input('queryEntity') queryString:string; //External Value assign to queryString

  @Output('getInfo') outgoingData= new EventEmitter(); // Event Lister object initialized

  driversListSeason:string; //Year of F1 Season
  filteredDrivers:any;  //Filtered List
  errorString:string;  //Error Value
  sortedData:any;     // Sorted Data Value
  
  constructor(private service: ErgastApiService){
    // Get Drivers List data using the Service
    this.service.getDriversList()
    .subscribe(
      (response: any)=>{
        this.driversListSeason=response.MRData.StandingsTable.season;
        this.sortedData=response.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice();
        this.filteredDrivers=this.sortedData;
      },(error: Response)=>{
        if(error.status===404){
          this.errorString=`Driver's list could not be retrieved`;
        }else{
          this.errorString=`An unexpected error occured.`;
        }
      });
  }


  ngOnChanges(changes: any) {
    //Execute the filtering when input value 'querySting' is not undefined
    if(changes.queryString.currentValue!==undefined){
      this.filteredDrivers = (this.queryString)?
      this.filteredDrivers.filter(q=>
        (q.Driver.givenName.toLowerCase().includes(this.queryString.toLowerCase()))||
        (q.Driver.familyName.toLowerCase().includes(this.queryString.toLowerCase()))||
        (q.Driver.nationality.toLowerCase().includes(this.queryString.toLowerCase()))
      ):this.sortedData;
    }
  }

  // Sorting Data 
  sortData(sort: Sort) {
    const data =  this.filteredDrivers.slice();
    if (!sort.active || sort.direction == '') {
      return data;
    }

    this.filteredDrivers = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'driverName': return compare(a.Driver.givenName, b.Driver.givenName, isAsc);
        case 'conName': return compare(a.Constructors[0].name, b.Constructors[0].name, isAsc);
        case 'driverWins': return compare(+a.wins, +b.wins, isAsc);
        default: return 0;
      }
    });
  }
  // END of Sorting

  //On-Click Event
  sendDriverDetails(dRowId){
    this.outgoingData.emit({passDriverId:dRowId,sidebarStatus:'true'});
  }
}

// Send values to app Component
export interface DriverInfoEventArgs{
  passDriverId,sidebarStatus;
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
