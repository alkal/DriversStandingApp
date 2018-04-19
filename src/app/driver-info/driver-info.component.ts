import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { ErgastApiService } from '../ergast-api.service';

@Component({
  selector: 'driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent{

  @Input('driverEntity') driverEntityID: string; //External Value assign to driverEntityID

  driverDetailsData:any; //Variable
  dateOfBirth:any;      //Variable
  errorString:string;   //Error string

  constructor(private service: ErgastApiService){}

  ngOnChanges(changes: any) {
    //Execute when external value is NOT undefined
    if(changes.driverEntityID.currentValue!==undefined){ //disable error message on init
      // Get Drivers Details data when external value is NOT undefined
      this.service.getDriverDetails(this.driverEntityID)
        .subscribe(
          (response:any)=>{
          this.driverDetailsData=response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          this.dateOfBirth=reverseString(this.driverDetailsData[0].Driver.dateOfBirth); //make date-of-birth human readable
          },(error:Response)=>{
            if(error.status===404){
              this.errorString=`Driver's details could not be retrieved`;
            }else{
              this.errorString=`An unexpected error occured.`;
            }
        }); 
    }
  }

}

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split("-"); 
  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse();
  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join("-"); 
  //Step 4. Return the reversed string
  return joinArray;
}