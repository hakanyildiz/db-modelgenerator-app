import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { environment } from '@env';
import { DbGenerateModelRequest } from '@shared/models/DbGenerateModelRequest';
import { ToastService } from '@shared/services/toast.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbGenerateModelsService {

  private path = environment.PATH.DB_GENERATE_MODELS;

  dataChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get data(): any {
    return this.dataChange.value;
  }


  constructor(private apiService: ApiService, private toastService: ToastService) { }

  execute(requestObj: DbGenerateModelRequest, produceType: string): void {

    this.toastService.show({ type: 'info', text: 'Modellerin Oluşturma isteği alındı.'})

    this.apiService.postResponseBufferData(this.path, requestObj).subscribe((responseData: any) => {
      // console.log('[execute] responseData', responseData);
      this.dataChange.next(this.downloadFile(responseData, produceType));
    }, (error: HttpErrorResponse) => {
      this.toastService.show({ type: 'error', text: error.message });
    });
  }

  /* Method is use to download file.
  * @param data - Array Buffer data
  * @param type - type of the document.
  */
  private downloadFile(data: any, type: string): boolean {
    var blob = new Blob([data], { type: type.toString() });
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Pop-up engelleyicileri kapatıp, tekrar deneyiniz!');

        this.toastService.show({type: 'error', text: 'Modeller oluşturulurken hata oluştu.'});
        return false;
      }

    this.toastService.show({type: 'success', text: 'Modellerin oluşturulması başarılı.'})
    return true;
  }
}
