import { Component } from '@angular/core';
import {DriverInfoEventArgs} from './drivers-list/drivers-list.component';
import {DriversFilterArgs} from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  driverDetails:any; //Drivers Id Value
  queryInput:any;   //Query string for filtering
  isToggled=false;  //Sidebar status

  DriverInfoEvent(eventArgs:DriverInfoEventArgs){
    this.driverDetails=eventArgs.passDriverId; //Driver Id comes from Event Listener Method
    this.isToggled=eventArgs.sidebarStatus;   //Sidebar status changed
  }

  DriversFilter(eventArgs:DriversFilterArgs){
    this.queryInput=eventArgs; //Query string comes from Event Listener Method
  }

  closeSidebar(){
    this.isToggled=false; //Sidebar closed
  }

}
