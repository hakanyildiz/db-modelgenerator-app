import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbConnectService } from '@app/services/db-connect.service';
import { DbConnectRequest } from '@shared/models/DbConnectRequest';
import { DbType } from '@shared/models/DbType';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-form-db-connect',
  templateUrl: './form-db-connect.component.html',
  styleUrls: ['./form-db-connect.component.scss']
})
export class FormDbConnectComponent implements OnInit {
  submit: any;
  hide = true;

  formControl = new FormControl('', [
    Validators.required
  ]);

  @Input()
  dbConnectInfo: DbConnectRequest = new DbConnectRequest();

  constructor(private dbConnectService: DbConnectService, private toastService: ToastService) { }

  ngOnInit(): void {
    // default port for oracle
    this.dbConnectInfo = { port: 1521, dbType: 'oracle' };
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Boş bırakmayınız' :
        '';
  }

  connect(): void {
    if (this.dbConnectInfo != null) {
      this.toastService.show({ type: 'warning', text: 'İşlem yapılacak olan son db bilgileri hafızaya kaydedildi.'})
      localStorage.setItem("db-connect-info", JSON.stringify(this.dbConnectInfo));
    }

    this.dbConnectService.connect(this.dbConnectInfo);
  }
}
