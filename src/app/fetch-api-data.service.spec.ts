import { TestBed } from '@angular/core/testing';
import {FetchApiDataService} from './fetch-api-data.service';

export class FetchApiDataServiceComponent {
  constructor() {

    describe('FetchApiDataService', () => {
      let service: FetchApiDataService;

      beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FetchApiDataService);
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });
    });
  }
}

