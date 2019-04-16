import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ValidationService } from './validation.service';
import { FormFieldFetcherService, IFormFieldResult } from './form-field-fetcher.service';
import { isArray } from 'util';
import { BehaviorSubject, forkJoin, from, Observable, Subscription } from 'rxjs';
import { OfferingPrice } from './custom/field-models/offeringPrice';
import { map, tap } from 'rxjs/operators';

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
  allFields$: Observable<any>;
  allFields = [];
  allFieldsSubs$: Subscription;

  constructor(private validationService: ValidationService, private fieldFetcherService: FormFieldFetcherService) {}

  ngOnInit() {
    console.log('Testing fetcher service...');
    const obs1 =
      this.fieldFetcherService.getFormFieldConfigs(['adTitle', 'description']).pipe(
        map((results: IFormFieldResult[]) => {
          const formFieldConfig: FormlyFieldConfig[] = [];
          results.forEach((result: IFormFieldResult, index: number) => {
            console.log(index, {result});
            const {key, templateOptions, wrappers, type}: FormlyFieldConfig = result.fieldAttribs;
            console.log({key});
            console.log({templateOptions});
            console.log({wrappers});
            console.log({type});
            formFieldConfig.push({key, templateOptions, wrappers, type});
          });
          return formFieldConfig;
        }),
        tap((results: FormlyFieldConfig[]) => {
          console.log(results);
        }),
      );
    const obs2 = this.getLocalFieldConfigs(['offeringPrice']);
    console.log('error here? No!');
    this.allFields$ = forkJoin(obs1, obs2)
      .pipe(
        map(([first, second]) => {
          console.log({first});
          console.log({second});
          const fieldList = first.concat(second);
          console.log(fieldList);
          return fieldList;
        })
      );
    this.allFieldsSubs$ = this.allFields$.subscribe((fields: FormlyFieldConfig[]) => {
      this.allFields = fields; // this is a fix to remove errors from formly (has trouble with async ops
    });
  }

  submit() {
    console.log('Submitting ', JSON.stringify(this.model));
  }

  /**
   * @description Instead of supplying the array of formlyFieldConfigs (as in formly's examples), this method take an (n) amount of
   *              strings(keys associated to the database) and returns the formlyFieldConfig[]
   * @param keysToRetrieve: string that is the key associated with the database
   * @warn must unsubscribe!  Always check that the service is associated with un-subscriber.
   * todo: determine if deprecated
   */
  getFormFieldConfigs(keysToRetrieve: string[]) {
    this.allFieldsSubs$ = this.fieldFetcherService.getFormFieldConfigs(keysToRetrieve)
      .subscribe(results => {
        console.log('in subscription, received result ', results);
        if (isArray(results)) {
          const tempFieldArr = [] as FormlyFieldConfig[];
          for (const result of results) {
            const {key, type, templateOptions} = {...result.fieldAttribs} as FormlyFieldConfig;
            tempFieldArr.push({key, type, templateOptions});
          }
          // todo: move the following statement elsewhere
          // tempFieldArr.push(...this.getLocalFieldConfigs(['offeringPrice']));
          this.fieldsFromDB$.next(tempFieldArr);
        }
      });
  }

  getLocalFieldConfigs(keysToRetrieve: string[]): Observable<FormlyFieldConfig[]> {
    if (!keysToRetrieve) {
      console.log('Nothing to retrieve...');
      return;
    }
    console.log('Retrieving local keys: ', keysToRetrieve);
    const tempArr = [] as FormlyFieldConfig[];
    keysToRetrieve.forEach((key: string) => {
      console.log({key});
    });
    const op = new OfferingPrice().getDefaultOptions();
    console.log({op});
    tempArr.push(op);
    return from([tempArr]);
  }

  ngOnDestroy() {
    if (this.allFieldsSubs$) {
      this.allFieldsSubs$.unsubscribe();
    }
  }
}

/*fields: FormlyFieldConfig[] = [ // kept as reference until I'm sure my db has the values of each object
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
  ];*/
