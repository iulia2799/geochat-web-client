import { TestBed } from '@angular/core/testing';

import { SharedmediaService } from './sharedmedia.service';

describe('SharedmediaService', () => {
  let service: SharedmediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedmediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
