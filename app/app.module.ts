import { Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SampleService } from './sample.service';
import {MatTabsModule} from '@angular/material';
import {SubSampleService} from './subsample.service';

import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler([
    
  ]);
}


@NgModule({
  providers: [
    SampleService,
    SubSampleService,
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  imports: [BrowserModule, FormsModule,MatTabsModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
