import { TestBed } from '@angular/core/testing';

import { ExhibitDownloadService } from './exhibit-download.service';

describe('ExhibitDownloadService', () => {
  let service: ExhibitDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
