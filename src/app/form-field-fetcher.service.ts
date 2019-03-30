import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface IFormFieldResult {
  id: number | string;
  formFieldName: string;
  fieldAttribs: FormlyFieldConfig;
}

@Injectable({
  providedIn: 'root'
})
export class FormFieldFetcherService {
  host = 'http://localhost';
  port = '3000';
  routePath = 'formFields';

  constructor(private httpService: HttpClient) { }

  getFormFieldConfig(fieldname?: string) {
    const URL = this.host + ':' + this.port + '/' + this.routePath + '/' + fieldname;
    console.log('retrieving * from ', URL);
    return this.httpService.get<IFormFieldResult>(URL).pipe(
      tap((result) => {
        // console.log('retrieved result: ', result);
      })
    );
  }
}
