import { FormControl, ValidationErrors } from '@angular/forms';

export const validations = {
  requiredMessage: (err, field) => {
    // console.log(err); //boolean
    // console.log(field); // fieldControl
    return `This field is required!`;
  },
  minlengthValidationMessage: (err, field) => {
    return `Should have at least ${field.templateOptions.minLength} characters`;
  },
  maxlengthValidationMessage: (err, field) => {
    return `This value should be less than ${field.templateOptions.maxLength} characters`;
  },
  minValidationMessage: (err, field) => {
    return `This value should be more than ${field.templateOptions.min}`;
  },
  maxValidationMessage: (err, field) => {
    return `This value should be less than ${field.templateOptions.max}`;
  }
};

export const validators = {
  required: (control: FormControl): ValidationErrors => {
    return control.value || null;
  },
  minlengthValidation: (control: FormControl): ValidationErrors => {
    if (control.value) {
      return {value: control.value.length} || null;
    }
  },
  maxlengthValidation: (control: FormControl): ValidationErrors => {
    if (control.value) {
      return {value: control.value.length} || null;
    }
  }

};
