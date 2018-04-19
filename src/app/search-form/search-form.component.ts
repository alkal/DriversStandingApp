import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output('filterData') ongoingData=new EventEmitter(); // Event Lister object initialized
  constructor() { }

  ngOnInit() {
  }

  //On Key-up Event
  filterList(querySting){
    this.ongoingData.emit(querySting);
  }

}

// Send Query String to app Component
export interface DriversFilterArgs{
  querySting;
}
