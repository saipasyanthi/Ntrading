import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailServiceService } from './mail-service.service';

export  class ResponseModel{
  statusCode: number
  statusMessage: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NatureOoze';
  Name: any;
  Count: any;
  Date: any;
  Message: any;
  Email: any;
  ContactNumber: any;
  private data: ResponseModel;

  constructor(
    private mailServiceService: MailServiceService  ) {}

  // tslint:disable-next-line:typedef
  sendMail(sendmailForm: NgForm){
  //  alert("pasyanthi");
            const formdata: FormData = new FormData();
            formdata.append('Name', sendmailForm.value.Name);
            formdata.append('Email', sendmailForm.value.Email);
            formdata.append('Contact_Number', sendmailForm.value.ContactNumber);
            formdata.append('Quantity', sendmailForm.value.Count);
            formdata.append('Message', sendmailForm.value.Message);
            
            this.mailServiceService.sendMail(formdata).subscribe( res => {
              alert(res);
              if (res){
                this.data = res;
                if (this.data.statusCode === 200){
                  alert(this.data.statusMessage);
                  sendmailForm.resetForm();
                }else{
                  alert(this.data.statusMessage);
                }
                alert("pasyanthi");
                console.log(JSON.stringify(this.data));
              }
            });
}




}
