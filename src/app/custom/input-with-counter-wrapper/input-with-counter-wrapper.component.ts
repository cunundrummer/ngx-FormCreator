import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-input-with-counter-wrapper',
  templateUrl: './input-with-counter-wrapper.component.html',
  styleUrls: ['./input-with-counter-wrapper.component.css']
})
export class InputWithCounterWrapperComponent extends FieldWrapper implements OnInit {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

  // todo: if this will not be used, remove this wrapper
  ngOnInit() {
    console.log(this.fieldComponent);
  }
}
