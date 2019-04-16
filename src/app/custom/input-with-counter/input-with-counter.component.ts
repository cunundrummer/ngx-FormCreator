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
    // this is the proper place for logging generic input
    console.log(this.genericInputRef.element);
    console.log('?field?: ', this.field);
    console.log('-----ngAfterViewInit-----');
  }

  /**
   * @description gets the validation names and trims them too match actual validations
   */
  getValidationNames(): string[] {
    return this.validationService.getValidationNames();
  }

  /**
   * @description Get the name of the formfield error, compares with validations from Validation Service.  If the methods in the validation
   *              service are not already the same as the formfield errors, then it strips the validation names to conform to the formfield
   *              errors. (Might be removed if standard is set - which should be.
   */
  getCurrentFormFieldError(): string {
    let key = '';
    let errorFound = false;
    console.log('<------Begin checking for formfielderrors------>');
    for (const assocValidation of this.assocValidations) {
      // just in case method names are different -> from a previous version.  Could possibly be removed / will need to be standardized
      const strippedStr = this.strStripper(assocValidation, 'message', 'validation');
      if (this.formControl.errors && !errorFound) {
        console.log('found possible error...', this.formControl.errors);
        for (const errKey of Object.keys(this.formControl.errors)) {
          console.log(`comparing: ${strippedStr} : ${errKey}`);
          if (strippedStr === errKey.toLocaleLowerCase()) {
            console.log('After comparing, errkey: ',  errKey);
            key = errKey;
            errorFound = true;
            break; // ensure quick exit out of loop.
          }
        }
      }
    }
    console.log('<------END checking for formfielderrors------>');
    if (key) {
      console.log('returning ', key);
      return key || '';
    } else {
      console.log('Input looks good, returning \'undefined\'.');
    }
  }

  /**
   * @description shortens a string by removing the instances of substrings(str)
   * @param fromStr the string you want to remove substrings from
   * @param substrToRemove substrings to remove
   * @todo place this in a utilitiesService - utilities/string utilities
   *
   */
  strStripper(fromStr: string, ...substrToRemove: string[]): string {
    const newStr: string[] = substrToRemove.map(s => {
      return fromStr.toLowerCase().replace(s.toLowerCase(), '');
    });
    return newStr[0];
  }
}
