import { Component, Input, OnInit } from '@angular/core';
import { DbConnectService } from '@app/services/db-connect.service';
import { DbGenerateModelsService } from '@app/services/db-generate-models.service';
import { DbConnectRequest } from '@shared/models/DbConnectRequest';
import { DbGenerateFilter, DbGenerateModelAdditionalParams, DbGenerateModelRequest } from '@shared/models/DbGenerateModelRequest';
import { DbTable } from '@shared/models/DbTable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-db-generatemodel',
  templateUrl: './form-db-generatemodel.component.html',
  styleUrls: ['./form-db-generatemodel.component.scss']
})
export class FormDbGeneratemodelComponent implements OnInit {

  @Input()
  tables: DbTable[] = [];

  selectedTables = [];
  selectedFilters: DbGenerateFilter[] = [];
  submit: any;
  additionalParams: DbGenerateModelAdditionalParams = { idtoUUIDFormat: false, classPackageName: '' };
  executeLoading = false;
  dbGenerateModelSubs: Subscription | undefined;

  constructor(private dbGenerateModelsService: DbGenerateModelsService) { }

  ngOnInit(): void {
    this.loadExecutionResult();
  }

  private loadExecutionResult(): void {
    this.dbGenerateModelSubs = this.dbGenerateModelsService.dataChange.subscribe((res) => {
      this.executeLoading = false;
    });
  }

  execute(): void {

    const request: DbGenerateModelRequest= {
      tables: this.selectedTables,
      additionalParams: this.additionalParams,
      filters: this.selectedFilters,
      connectRequest: this.getDbInfoFromLocalStorage()
    };

    this.executeLoading = true;

    this.dbGenerateModelsService.execute(request, 'application/zip');
  }


  getDbInfoFromLocalStorage(): DbConnectRequest {
    const value = localStorage.getItem("db-connect-info");

    if (value != null) {
      return JSON.parse(value || '{}');
    }

    return {};
  }


  filterListEventHandler(data: DbGenerateFilter[]) {
    this.selectedFilters = data;
  }
}
