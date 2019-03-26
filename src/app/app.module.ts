import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { validations, validators } from './validations/validations';
import { InputWithCounterComponent } from './custom/input-with-counter/input-with-counter.component';
import { InputWithCounterWrapperComponent } from './custom/input-with-counter-wrapper/input-with-counter-wrapper.component';
import { ValidationService } from './validation.service';

@NgModule({
  declarations: [
    AppComponent,
    InputWithCounterComponent,
    InputWithCounterWrapperComponent,
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
        {name: 'inputWithCounter', extends: 'input', component: InputWithCounterComponent},
        {name: 'inputWithCounter2', component: InputWithCounterComponent}
      ],
      wrappers: [
        { name: 'inputWithCounterWrapper', component: InputWithCounterWrapperComponent}
      ],
      validators: [
        {name: 'required', validation: validators.required},
        {name: 'minLength', validation: validators.minlengthValidation},
        {name: 'maxLength', validation: validators.maxlengthValidation}
      ],
      validationMessages: [
        {name: 'required', message: validations.requiredMessage},
        {name: 'minlength', message: validations.minlengthValidationMessage},
        {name: 'maxlength', message: validations.maxlengthValidationMessage},
        {name: 'min', message: validations.minValidationMessage},
        {name: 'max', message: validations.maxValidationMessage},
      ]
    }),
  ],
  entryComponents: [],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
