import { TestBed, inject } from '@angular/core/testing';

import { ErgastApiService } from './ergast-api.service';

describe('ErgastApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErgastApiService]
    });
  });

  it('should be created', inject([ErgastApiService], (service: ErgastApiService) => {
    expect(service).toBeTruthy();
  }));
});
