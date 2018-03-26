import { Component, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import 'rxjs/add/operator/filter';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { read } from 'fs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  moduleId: module.id,
  selector: 'inline-edit',
  styleUrls: ['inline-edit.component.scss'],
  templateUrl: 'inline-edit.component.html',
})
export class InlineEditComponent {

  public _title: string;
  @Input()
  get title(): string { return this._title; }
  set title(x: string) { this._title = x; }

  public _requiredText: string;
  @Input()
  get requiredText(): string { return this._requiredText; }
  set requiredText(x: string) { this._requiredText = x; }

  public _infoText: string;
  @Input()
  get InfoText(): string { return this._infoText; }
  set InfoText(x: string) { this._infoText = x; }


  commentFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    if (x) x = x.trim();
    if (!this._Originalvalue) {
      this._Originalvalue = x;
    }
    this.comment = this._value = x;
  }
  private _value = '';
  private _Originalvalue;
  /** Form model for the input. */
  _comment = '';
  get comment(): string { return this._comment; }
  set comment(x: string) {
    let str: string = '';
    if (x) {
      for (let i = 0; i < x.length; i++) {
        let code = x.charCodeAt(i);
        if (this.onlyAlphaNumericKey(code)) {
          str += x.charAt(i);
        }
      }
    }
    this._comment = str;
  }
  constructor( @Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed
        .filter(val => val == null)
        .subscribe(() => this.comment = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      if (this.comment)
        this.comment = this.comment.trim();
      this._Originalvalue = this.comment;
      this.popover.close(this.comment);
    }
  }

  onCancel() {
    this.value = this._Originalvalue;
    if (this.popover) {
      this.popover.close();
    }
  }
  isEmpty() {
    if (this.comment) {
      let _comment = this.comment.trim();
      if (_comment.length == 0) {
        return true;
      }
    }
    return false;
  }
  onlyAlphaNumericKey(charCode) {
    return charCode == 45 // - line
      || charCode == 95 // _ underline
      || charCode == 32 // space
      || charCode == 0 // chars in firefox
      || charCode == 241 // ñ
      || charCode == 209 // Ñ
      || (charCode >= 97 && charCode <= 122) // a-z
      || (charCode >= 48 && charCode <= 57) // 0-9
      || (charCode >= 65 && charCode <= 90) // A-Z
      ; 
  }
}