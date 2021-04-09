import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbGenerateFilter } from '@shared/models/DbGenerateModelRequest';

@Component({
  selector: 'app-generate-filter-list',
  templateUrl: './generate-filter-list.component.html',
  styleUrls: ['./generate-filter-list.component.scss']
})
export class GenerateFilterListComponent implements OnInit {
  filterList: DbGenerateFilter[] = [];
  submit: any;
  @Output() filterListEvent: EventEmitter<DbGenerateFilter[]> = new EventEmitter<DbGenerateFilter[]>();


  newFilter: DbGenerateFilter = { afterValue: '', beforeValue: '', generateFilterTypes: 'replace', value :''};
  constructor() { }

  ngOnInit(): void {

  }

  addFilter(event: any): void {
    if(!this.filterIsReady()) {
      return;
    }
    this.filterList.push(Object.assign({}, this.newFilter));

    this.newFilter = { afterValue: '', beforeValue: '', generateFilterTypes: 'replace', value :''};

    event.preventDefault();
  }

  removeFilter(index: number): void {
    this.filterList.splice(index, 1);
    this.updateFilterEvent();
  }

  filterIsReady(): boolean {
    const { afterValue, beforeValue, generateFilterTypes, value } = this.newFilter;
    if (generateFilterTypes === 'replace') {
      if (afterValue === '' || beforeValue === '') {
        return false;
      }
    } else {
      if (value === '') return false;
    }

    return true;
  }

  updateFilterEvent(): void {
    this.filterListEvent.emit(this.filterList);

  }
}


