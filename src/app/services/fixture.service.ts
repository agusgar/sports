import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fixtures } from '../entities/fixtures';
import { FixtureExecution } from '../entities/fixtureExecution';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {
  private url = `${environment.baseUrl}/api/fixture`;

  constructor(private http: HttpClient) { }

  getFixtures(): Observable<Fixtures> {
    return this.http.get<Fixtures>(this.url);
  }

  reloadFixtures(): Observable<Fixtures> {
    return this.http.get<Fixtures>(`${this.url}/ForzarCargaFixtures`);
  }

  executeFixture(fixture: FixtureExecution, date: Date) {
    return this.http.post(`${this.url}/GenerarFixture/${format(date, 'MM-DD-YYYY')}`, fixture, { responseType: 'text' });
  }
}
