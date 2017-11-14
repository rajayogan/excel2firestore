import { TestBed, inject } from '@angular/core/testing';

import { XltofirestoreService } from './xltofirestore.service';

describe('XltofirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XltofirestoreService]
    });
  });

  it('should be created', inject([XltofirestoreService], (service: XltofirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
