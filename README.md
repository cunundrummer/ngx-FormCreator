## Purpose

While creating a dynamic form is fun, it could be time consuming.  I have tried formly before and as a basic form creation utility, it worked flawlessly.  However, when I tried to add a character counter, or display an error within a custom component, I had trouble, resulting in me creating a dynamic form lib. in regular 'ol Angular. 

So, after some more experience with Angular and Typescript, I attempted again.  After a few more frustrating attempts, I figured it out - and still finding more and quicker ways to do things. 

This is the result.  ~~Not completed yet as I want to get the form configuration from my database.~~  But it is functioning as I want it :)

As of today: Sun March 31, 17:28, I can retrieve it from the database.  Good job, me!

Mon Apr 15, 14:25:  I forked and have managed to create the form configuration on the backend, and send it to the front-end to be rendered.  By placing the function body in string litererals, I have managed to get things working. However, it does not seem safe to continue in that way.  Security is more important! I will try another method and hopefully the end result does not inflate the size of the project.  

# FormCreator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

Also using [Angular (ngx)Formly](https://ngx-formly.github.io/ngx-formly)

and [Angular Material](https://material.angular.io).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
