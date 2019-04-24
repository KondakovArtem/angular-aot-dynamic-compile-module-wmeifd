import {Injectable} from '@angular/core';
import {SampleService} from './sample.service';

@Injectable()
export class SubSampleService {
  constructor(private sample: SampleService) {

  }

  foo() {
    return 'sub  ' + this.sample.foo();
  }
}