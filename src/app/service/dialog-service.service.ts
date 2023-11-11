import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMessageComponent } from '../message/dialog-message/dialog-message.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
 
 
  data:Data={
    message: '',
    discase: false
  }
  discase = new BehaviorSubject<boolean>(false);

  constructor(private dialogue:MatDialog) { }
 
  confirmMessage(message:string){
    let discase=false;
    const dialogConf = new MatDialogConfig();
    dialogConf.autoFocus=true;
    dialogConf.disableClose=true;
    this.data.message=message;
    dialogConf.data = this.data;
    const dialogRef = this.dialogue.open(DialogMessageComponent,dialogConf);
    dialogRef.afterClosed().subscribe(
      (response:Data)=>{
        this.discase.next(response.discase);
        // this.closeEditeDialogProduct(response.discase);
        console.log(response);
        // this.discase.next(response.discase);
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

  closeEditeDialogProduct(discaseValue:boolean): void{
    
  }

  closeEditeDialog$(): Observable<boolean> {
   return this.discase.asObservable();
  }
  updateValue() {
    this.discase.next(false);
  }
}

export interface Data{
  message:string;
  discase:boolean;
}