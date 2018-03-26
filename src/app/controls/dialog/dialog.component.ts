import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'st-dialog',
	styleUrls: ['dialog.component.scss'],
	templateUrl: 'dialog.component.html',
})
export class DialogComponent {
    public message: string;

    constructor(public dialogRef: MatDialogRef<DialogComponent>) {

    }
}