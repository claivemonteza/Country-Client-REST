import { Component, Output, EventEmitter } from '@angular/core';


const REGION_OPTIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  regionOptions = REGION_OPTIONS;
  
  @Output()
  filter = new EventEmitter<string>();


  select(filter: string) {
    this.filter.emit(filter);
  }

}
