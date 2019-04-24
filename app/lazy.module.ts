import {NgModule} from "@angular/core";
import {Component} from '@angular/core';
import { SampleService } from './sample.service';

export function CustomComponent(annotation: any) {
    return function (target: Function) {
        const component = new Component(annotation);
        Component(component)(target);

    };
}

export function CustomNgModule(annotation: any) {
    return function (target: Function) {
        const ngModule = new NgModule(annotation);
        NgModule(ngModule)(target);
    };
}



@CustomComponent({
  selector: 'lazy-component',
  template: 'Lazy-loaded component. name:  {{name}}.Service {{service.foo()}}!',
  //providers: [SampleService]
})
export class LazyComponent {
  name;
  constructor(public service: SampleService) {
    console.log(service);
    console.log(service.foo());
  }
}

@CustomNgModule({
  declarations: [LazyComponent],
  providers: [SampleService]
})
export class LazyModule {
}
