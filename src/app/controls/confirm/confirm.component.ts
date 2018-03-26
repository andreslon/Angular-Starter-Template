import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
	styleUrls: ['confirm.component.scss'],
	templateUrl: 'confirm.component.html',
})
export class ConfirmComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmComponent>) {

    }
}