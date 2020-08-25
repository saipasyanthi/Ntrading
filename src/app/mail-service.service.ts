import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private http: HttpClient) { }
  public sendMail(formdata: FormData) {
      const url = 'http://ntradingstore.com/MailApi.php';
    return this.http.post<ResponseModel>(url, formdata);
  
  }
}
