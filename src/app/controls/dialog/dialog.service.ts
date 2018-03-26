import { Observable } from 'rxjs/Rx';
import { DialogComponent } from './dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public show(message: string): Observable<boolean> {
        let dialogRef: MatDialogRef<DialogComponent>;
        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }
}