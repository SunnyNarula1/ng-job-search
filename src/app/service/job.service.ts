import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private api_url = '/jobs';

  constructor(private http: HttpClient) { }

  // Get All Job List from the API
  getAllJobList() : Observable<Job[]> {
    return this.http.get<Job[]>(this.api_url)
    .pipe(catchError((error) => this.errorHandler(error)));
  }

  errorHandler(error: Error) {
    return throwError(error);
  }
}
