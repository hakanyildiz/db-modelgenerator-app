import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { environment } from '@env';
import { DbConnectRequest } from '@shared/models/DbConnectRequest';
import { ToastService } from '@shared/services/toast.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbConnectService {

  private path = environment.PATH.DB_CONNECT;

  dataChange: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  get data(): string[] {
    return this.dataChange.value;
  }

  constructor(private apiService: ApiService, private toastService: ToastService) { }

  connect(dbConnectRequest: DbConnectRequest): void {
    this.toastService.show({ type: 'info', text:  dbConnectRequest.ip + '\'li veritabanına bağlantı isteği alındı.' });


    this.apiService.post(this.path, dbConnectRequest).subscribe((responseData) => {
      // console.log('[connect] responseData', responseData);

      if (responseData && responseData.ok === false) {
        this.toastService.show({ type: 'error', text: responseData.message });
      } else {
        if (responseData && responseData.status === false) {
          this.toastService.show({ type: 'error', text: responseData.message });
        } else {
          this.dataChange.next(responseData.tableNames);
          this.toastService.show({ type: 'success', text: responseData.message });
        }
      }
    }, (error: HttpErrorResponse) => {
      this.toastService.show({ type: 'error', text: error.message });
    });
  }
}
