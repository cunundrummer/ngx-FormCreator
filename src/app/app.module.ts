import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputWithCounterComponent } from './custom/input-with-counter/input-with-counter.component';

import { ValidationMessages, ValidationService, Validators } from './validation.service';
import { FormFieldFetcherService } from './form-field-fetcher.service';

@NgModule({
  declarations: [
    AppComponent,
    InputWithCounterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'inputWithCounter',
          component: InputWithCounterComponent,
          defaultOptions: {
            validators: {
              required: Validators.required,
              minLength: Validators.minlengthValidation
            }
          },
        }
      ],
      validationMessages: [
        { name: 'required', message: ValidationMessages.required.bind(Validators.required) },
        { name: 'minlength', message: ValidationMessages.minlength.bind(Validators.minlengthValidation) }
      ],
    }),
  ],
  entryComponents: [],
  providers: [ValidationService, FormFieldFetcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
