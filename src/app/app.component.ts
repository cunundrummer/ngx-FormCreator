import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from './validation.service';
import { FormFieldFetcherService } from './form-field-fetcher.service';
import { isArray } from 'util';
import { BehaviorSubject, Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  universalForm = new FormGroup({});
  model: {} = {} as IUniversalForm;
  options: FormlyFormOptions = {};
  fieldsFromDB$: BehaviorSubject<FormlyFieldConfig[]> = new BehaviorSubject<FormlyFieldConfig[]>([]);
  fieldsFromDBSubs$: Subscription;

  constructor(private validationService: ValidationService, private fieldFetcherService: FormFieldFetcherService) {}

  ngOnInit() {
    // console.log(this.fields);
    console.log('Testing fetcher service...');
    this.getFormFieldsConfigsFromDB('adTitle');
  }

  submit() {
    console.log('Submitting ', JSON.stringify(this.model));
  }

  /**
   * @description Instead of supplying the array of formlyFieldConfigs (as in formly's examples), this method take an (n) amount of
   *              strings(keys associated to the database) and returns the formlyFieldConfig[]
   * @param keyToRetrieve string that is the key associated with the database
   * @warn must unsubscribe!  Always check that the service is associated with unsubscriber.
   * @todo set keyToRetrieve to ...keysToRetrieve: string[].  This way, the entire form for the specific page can be built.
   */
  getFormFieldsConfigsFromDB(keyToRetrieve: string) {
    this.fieldsFromDBSubs$ = this.fieldFetcherService.getFormFieldConfig(keyToRetrieve).subscribe(result => {
        console.log('in subscription, received result ', result);
        if (isArray(result)) {
          const {key, type: type, templateOptions: templateOptions} = {...result[0].fieldAttribs} as FormlyFieldConfig;
          this.fieldsFromDB$.next([{...{key, type, templateOptions}}]);
          console.log(this.fieldsFromDB$.getValue());
        }
      });
  }

  ngOnDestroy() {
    if (this.fieldsFromDBSubs$) {
      this.fieldsFromDBSubs$.unsubscribe();
    }
  }
}

/*fields: FormlyFieldConfig[] = [ // kept as reference until I'm sure my db has the values of each object
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
