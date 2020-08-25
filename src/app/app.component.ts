import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailServiceService } from './mail-service.service'; 
import {FormControl} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export  class ResponseModel{
  statusCode: number
  statusMessage: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit   {
 

  title = 'NatureOoze';
  Name: any;
  Count: any;
  Date: any;
  Message: any;
  Email: any;
  ContactNumber: any;
  private data: ResponseModel;
  ItemList = []; 
  selected:any;
  requiredField: boolean = false;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'TOILETZ' },
      { item_id: 2, item_text: 'COVID SAFTEY KIT' },
      { item_id: 3, item_text: 'HYGEINE KIT' },
      { item_id: 4, item_text: 'SIXTH FINGER' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'TOILETZ' },
      { item_id: 4, item_text: 'SIXTH FINGER' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll:false,
       itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
 
  setStatus() {
    (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
  }

  onItemSelect(item: any) {
    this.ItemList.push(item.item_text);
    this.setClass();
  }

  onDeSelect(item: any) {
    const index: number = this.ItemList.indexOf(item.item_text);
    if (index !== -1) {
        this.ItemList.splice(index, 1);
    } 
    this.setClass();  
  } 
    setClass() {
      this.setStatus();
      if (this.selectedItems.length > 0) { return 'validField' }
      else { return 'invalidField' }
    }
    submission() {
      if (this.requiredField == false) {
        /* Print a message that not all required fields were filled... */
      }
      /* Do form submission... */
    }
  


  constructor(
    private mailServiceService: MailServiceService  ) {}

  // tslint:disable-next-line:typedef
  sendMail(sendmailForm: NgForm){
  
            const formdata: FormData = new FormData();
            formdata.append('Name', sendmailForm.value.Name);
            formdata.append('Email', sendmailForm.value.Email);
            formdata.append('Contact_Number', sendmailForm.value.ContactNumber);
            formdata.append('Quantity', sendmailForm.value.Count);
            formdata.append('Message', sendmailForm.value.Message);
            formdata.append('Item_type', JSON.stringify(this.ItemList));
         
           new Response(formdata).text().then(console.log);

            this.mailServiceService.sendMail(formdata).subscribe( res => {
              if (res){
                this.data = res;
                if (this.data.statusCode === 200){
                  alert(this.data.statusMessage);
                  sendmailForm.resetForm();
                }else{
                  alert(this.data.statusMessage);
                }
                 console.log(JSON.stringify(this.data));
              }
            });
}




}
