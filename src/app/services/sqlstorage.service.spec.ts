import { TestBed } from '@angular/core/testing';

import { SqlstorageService } from './sqlstorage.service';

describe('SqlstorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SqlstorageService = TestBed.get(SqlstorageService);
    expect(service).toBeTruthy();
  });
});
