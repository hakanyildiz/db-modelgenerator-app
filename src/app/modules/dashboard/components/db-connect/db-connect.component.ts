import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbConnectService } from '@app/services/db-connect.service';
import { DbTable } from '@shared/models/DbTable';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-db-connect',
  templateUrl: './db-connect.component.html',
  styleUrls: ['./db-connect.component.scss']
})
export class DbConnectComponent implements OnInit, OnDestroy {
  step = 0;
  tables: DbTable[] = [];
  dbConnectInfo: any;
  // dbGenerateFilterList: DbGenerateFilter[] = [];

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
    this.updatePanelAccess();
  }

  updatePanelAccess() {
    this.dbGeneratorDisabled = !this.dbGeneratorDisabled;
  }

  dbGeneratorDisabled = true;

  formDbConnectPanel = true;

  dbConnectSubs: Subscription | undefined;

  constructor(private dbConnectService: DbConnectService, private toastService: ToastService) { }

  ngOnInit(): void {
    // this.tables.push({group: 'all', name: 'a'});
    // this.tables.push({group: 'all', name: 'b'});
    // this.tables.push({group: 'all', name: 'c'});
    this.initDbConnectSubs();
  }

  initDbConnectSubs() {
    this.dbConnectSubs = this.dbConnectService.dataChange.subscribe((names) => {
      if (names.length > 0 ) {
        this.tables = names.map(name => ({ name, group: 'all' }));

        this.setStep(1);
        this.updatePanelAccess();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dbConnectSubs) {
      this.dbConnectSubs.unsubscribe();
    }
  }

  getDbInfoFromLocalStorage(): void {
    const value = localStorage.getItem("db-connect-info");

    if (value != null) {
      this.dbConnectInfo = JSON.parse(value || '{}');
      this.toastService.show({ type: 'info', text: 'Son işlem yapılan db bilgileri getirildi.'})
      // console.log(' dbConnectInfo', this.dbConnectInfo)
    } else {
      this.toastService.show({ type: 'warning', text: 'Hafızada db bilgisi bulunmamaktadır. İlk işlemden sonra oluşacaktır.'})
    }
  }

}
