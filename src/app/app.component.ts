import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService, Validators } from './validation.service';
import { FormFieldFetcherService } from './form-field-fetcher.service';
import { isArray } from 'util';
import { BehaviorSubject } from 'rxjs';

export interface IUniversalForm {
  adTitle: string;
  description: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  universalForm = new FormGroup({});
  model: {} = {} as IUniversalForm;
  options: FormlyFormOptions = {};
  fieldsFromDB: BehaviorSubject<FormlyFieldConfig[]> = new BehaviorSubject<FormlyFieldConfig[]>([]);
  /*fields: FormlyFieldConfig[] = [
    {
      key: 'adTitle',
      type: 'inputWithCounter',
      templateOptions: {
        label: 'Ad title',
        required: true,
        type: 'text',
        minLength: 5,
        maxLength: 10,
      }
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'textarea',
        label: 'Description',
        required: true,
        minLength: 15,
      },
    },
    {
      key: 'forSaleBy',
      type: 'radio',
      templateOptions: {
        label: 'For sale by',
        options: [
          { value: 'owner', key: 'owner' },
          { value: 'dealer', key: 'dealer' }
        ],
        required: true,
        labelPosition: 'before',
        description: 'for sale by owner DESCRIPTION'
      },
    },
    {
      key: 'gender',
      type: 'radio',
      templateOptions: {
        label: 'I\'m a ',
        options: [
          { value: 'male', key: 'male' },
          { value: 'female', key: 'female' },
          { value: 'other', key: 'other' }
        ],
        labelPosition: 'after',
        required: true

      }
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Checkbox label',
      },
    },
  ];*/

  constructor(private validationService: ValidationService, private fieldFetcherService: FormFieldFetcherService) {}

  ngOnInit() {
    // console.log(this.fields);
    console.log('Testing fetcher service...');
    this.getFormFieldsConfigsFromDB('adTitle');
  }

  submit() {
    console.log('Submitting ', JSON.stringify(this.model));
  }

  getFormFieldsConfigsFromDB(keyToRetrieve: string) {
    this.fieldFetcherService.getFormFieldConfig(keyToRetrieve)
      .subscribe(result => {
        console.log('in subscription, received result ', result);
        if (isArray(result)) {
          const {key, type: type, templateOptions: templateOptions} = {...result[0].fieldAttribs} as FormlyFieldConfig;
          this.fieldsFromDB.next([{...{key, type, templateOptions}}]);
          console.log(this.fieldsFromDB.getValue());
        }
      });
  }
}
