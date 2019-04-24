import {Injectable} from '@angular/core';

@Injectable()
export class SampleService {
  constructor() { }

  public foo() {
    return 'bar';
  }
}