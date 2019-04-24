import {
  Component,
  Compiler, ViewContainerRef,
  ViewChild, Injector, NgModuleRef, NgModule, OnInit, Injectable
} from '@angular/core';
import {MatTabsModule} from '@angular/material';
import { SubSampleService } from './subsample.service';
import { SampleService } from './sample.service';
import { LazyModule,CustomComponent, CustomNgModule } from './lazy.module';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 5';

  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  constructor(
    private compiler: Compiler, private sampleService: SampleService) {

  }

  ngOnInit() {

  }
  /*
    ngAfterViewInit() {
  
      this.compiler.compileModuleAndAllComponentsAsync(LazyModule)
        .then((factories) => {
          const f = factories.componentFactories[0];
  
          const cmpRef = this.vc.createComponent(f);
  
          cmpRef.instance.name = 'dynamic';
        });
    }
  */

  ngAfterViewInit() {

    const template = '<span>generated on the fly: {{name}}</span><mat-tab-group><mat-tab label="Tab 1">Content 1</mat-tab><mat-tab label="Tab 2">Content 2</mat-tab></mat-tab-group>';

@CustomComponent({
  selector: 'lazy-component',
  template: template,
  //providers: [SampleService]
})
class LazyComponent implements OnInit {
  name;
  constructor(public service: SubSampleService) {
  }

  ngOnInit() {
    setTimeout(() => {
        this.name = this.service.foo();
    },1000);
  }
}

@CustomNgModule({
  imports: [MatTabsModule],
  declarations: [LazyComponent],
  providers: [SampleService, SubSampleService]
})
class LazyModule { }
    this.compiler.compileModuleAndAllComponentsAsync(LazyModule)
      .then((factories) => {
        
        const factory = factories.componentFactories.find((comp) =>
            comp.componentType === LazyComponent
        );
        console.log(factories.componentFactories);
        const cmpRef = this.vc.createComponent(factory);

        cmpRef.instance.name = 'dynamic';
      });
  }
}