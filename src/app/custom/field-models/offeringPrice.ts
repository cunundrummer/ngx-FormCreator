import { FormlyFieldConfig } from '@ngx-formly/core';

export class OfferingPrice {

  constructor() {}

  getDefaultOptions(): FormlyFieldConfig {
    return {
      key: 'offeringPrice',
      wrappers: ['wrapper'],
      templateOptions: {
        label: 'Ad Type'
      },
      fieldGroup: [
        {
          key: 'offeringFor',
          type: 'radio',
          templateOptions: {
            required: true,
            label: 'I am offering for ',
            labelPosition: 'after',
            options: [
              {key: 0, value: 'free'},
              {key: 1, value: 'rent'},
              {key: 2, value: 'price'}
            ]
          }
        },
        {
          key: 'offerFor.price',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: '$ Price', // consider dynamically changing label here
            min: 0,
            step: 0.5,
          },
          hideExpression: (model) => {
            const key = 'offeringFor';
            const FREE = 0;   // quick fix until I can retrieve the options values
            const RENT = 1; // fix until I can retrieve the options values
            const PRICE = 2;

            return !(model[key] === RENT || model[key] === PRICE);
          },
          expressionProperties: {
            /**
             * @description Can change the label of fieldGroup key. In this case key is offer.price.
             */
           'templateOptions.label': (model) => {
              const key = 'offeringFor'; // related fieldGroup key
              const FREE = 0;   // quick fix until I can retrieve the options values
              const RENT = 1;   // quick fix until I can retrieve the options values
              const PRICE = 2;  // quick fix until I can retrieve the options values
              if (model[key] === RENT) {
                return '$ Rent';
              }
              if (model[key] === PRICE) {
                return '$ Price';
              }
            },
            'templateOptions.onchange': (model) => {
              /*const FREE = 0;
              const RENT = 1;
              const PRICE = 2;
              const radioOptionAsKey = 'offeringFor';
              const key = 'offerFor';
              const priceKey = 'price';
              // maybe not necessary here.  If the user wants to change back to $, the value should remain.
              // This should be taken care of on form submit?
              if (model[radioOptionAsKey] === FREE) {
                if (Object(model[key]).hasOwnProperty('price')) {
                  model[key][priceKey] = 0; // price reset because free
                }
              } else {
                // removed assignment of old and new values because formly overwrites (formly bug calls multiple times)
              }*/
            },
          }
        }
      ]
    };
  }
}
