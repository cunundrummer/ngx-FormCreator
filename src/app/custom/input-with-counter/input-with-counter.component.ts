import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ValidationService } from '../../validation.service';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-with-counter',
  templateUrl: './input-with-counter.component.html',
  styleUrls: ['./input-with-counter.component.css']
})
export class InputWithCounterComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild('genericInput', {read: ElementRef}) genericInput: ElementRef<HTMLInputElement>;
  @ViewChild('genericInput', {read: ViewContainerRef}) genericInputRef: ViewContainerRef;
  @ViewChild(MatInput) formFieldControl: MatInput;

  @Input() formControl: FormControl;
  assocValidations: string[] = [];
  errorStr$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  errorMsgStr$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private validationService: ValidationService, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.assocValidations = this.getValidationNames(); // gets validation method names from validation service
    console.log('assocValidations: ', this.assocValidations);

    /**
     * Initial setup for formly, otherwise it does not display errors.
     * no errors returns 'undefined' - which is good in this case.
     */
    this.errorStr$.next(this.getCurrentFormFieldError());
    this.validationService.getValidationMessage(this.errorStr$.getValue(), this.field);
    this.errorMsgStr$.next(this.validationService.getValidationMessage(this.errorStr$.getValue(), this.field));

    this.renderer.listen(this.genericInput.nativeElement, 'input', (ev: Event) => {
      console.log('change registered!');
      this.errorStr$.next(this.getCurrentFormFieldError());
      console.log('errorStr$:', this.errorStr$.getValue());
      this.errorMsgStr$.next(this.validationService.getValidationMessage(this.errorStr$.getValue(), this.field));
    });
  }

  ngAfterViewInit() {
    console.log('-----ngAfterViewInit-----');
    // console.log(this.genericInput.nativeElement.minLength); // this is the proper place for logging generic input
    console.log(this.genericInputRef.element);
    console.log('?field?: ', this.field);
    console.log('-----ngAfterViewInit-----');
  }

  /**
   * @description gets the validation names and trims them too match actual validations
   */
  getValidationNames(): string[] {
    // console.log(this.validationService.getValidationNames());
    return this.validationService.getValidationNames();
  }

  getFormFieldErrorMessage(ffCtrl?: FormControl) {
    if (this.formFieldControl.empty && this.formControl.untouched) {
      console.log('no errors yet');
    }
  }

  getCurrentFormFieldError(): string {
    let key = '';
    let errorFound = false;
    this.assocValidations.forEach((av: string) => {
      const strippedStr =
        av.toLocaleLowerCase()
          .replace('message', '')
          .replace('validation', '');
      // console.log(strippedStr);
      if (this.formControl.errors && !errorFound) {
        console.log('found possible error...', this.formControl.errors);
        Object.keys(this.formControl.errors).forEach(errkey => {
          console.log(`comparing: ${strippedStr} : ${errkey}`);
          if (strippedStr === errkey.toLocaleLowerCase()) {
            console.log('After comparing, errkey: ',  errkey);
            key = errkey;
            errorFound = true;
            return key;
          }
        });
      }
    });
    if (key) {
      console.log('returning ', key);
      console.log('errorFound? ', errorFound);
      return key || '';
    } else {
      console.log('Input looks good, returning \'undefined\'.');
    }
  }

  /**
   * @description shortens a string by removing the instances of substrings(str)
   * @param fromStr the string you want to remove substrings from
   * @param substrToRemove substrings to remove
   *
   */
  strStripper(fromStr: string, ...substrToRemove: string[]): string {
    const newStr: string[] = substrToRemove.map(s => {
      return fromStr.toLowerCase().replace(s.toLowerCase(), '');
    });
    return newStr[0];
  }
}
