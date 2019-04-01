import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  /**
   * @description gets a single form field from the database
   * @param fieldname: string the name to retrieve
   */
  getFormFieldConfig(fieldname?: string) {
    const URL = this.host + ':' + this.port + '/' + this.routePath + '/' + fieldname;
    console.log('retrieving * from ', URL);
    return this.httpService.get<IFormFieldResult[]>(URL);
  }

  getFormFieldConfigs(fieldnames?: string[]) {
    const fieldKeys =  fieldnames.map((formFieldName: string) => {
      return {formFieldName};
    });
    console.log('After building fieldKeys => ', fieldKeys);
    const URL = this.host + ':' + this.port + '/' + this.routePath + '/' + JSON.stringify(fieldKeys);
    console.log('retrieving * from ', URL);
    return this.httpService.get<IFormFieldResult[]>(URL);
  }

}
