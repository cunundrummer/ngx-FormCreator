import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService, Validators } from './validation.service';

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
  fields: FormlyFieldConfig[] = [
    {
      key: 'adtitle',
      type: 'inputWithCounter2',
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
  ];

  constructor(private validationService: ValidationService) {}

  ngOnInit() {
    console.log(this.fields);
  }

  submit() {
    console.log('Submitting ', JSON.stringify(this.model));
  }
}
