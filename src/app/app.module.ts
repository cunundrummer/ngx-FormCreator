import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { InputWithCounterComponent } from './custom/input-with-counter/input-with-counter.component';

import { ValidationMessages, ValidationService, Validators } from './validation.service';

@NgModule({
  declarations: [
    AppComponent,
    InputWithCounterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'inputWithCounter',
          extends: 'input',
          component: InputWithCounterComponent,
        },
        {
          name: 'inputWithCounter2',
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
        // todo: retrieve the messages from the validationService (still getting comfortable with ngx-formly)
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  entryComponents: [],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
