import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

export const ValidationMessages = {
  required: (err, field) => {
    // console.log(err); //boolean
    // console.log(field); // fieldControl
    return `This field is required!`;
  },
  minlength: (err, field) => {
    return `Should have at least ${field.templateOptions.minLength} characters`;
  },
  maxlength: (err, field) => {
    return `This value should be less than ${field.templateOptions.maxLength} characters`;
  },
  min: (err, field) => {
    return `This value should be more than ${field.templateOptions.min}`;
  },
  max: (err, field) => {
    return `This value should be less than ${field.templateOptions.max}`;
  }
};

export const Validators = {
  required: (control: FormControl): ValidationErrors => {
    return control.value || null;
  },
  minlengthValidation: (control: FormControl): ValidationErrors => {
    if (control.value) {
      return {value: control.value.length} || null;
    }
  }

};

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  getValidationNames(): string[] {
    const validations = ValidationMessages;
    const vnames: string[] = [];
    Object.keys(validations).forEach(v => {
      if (v) {
        // console.log(v);
        vnames.push(v);
      }
    });
    return vnames;
  }

  getValidationMessage(errorStr: string, field) {
    const validations = ValidationMessages;
    console.log('getting validation message for: ', errorStr);
    console.log(validations.required.name);
    if (errorStr === validations[errorStr].name) {
      console.log(validations[errorStr](true, field));
      return validations[errorStr](true, field);
    }
  }
}
