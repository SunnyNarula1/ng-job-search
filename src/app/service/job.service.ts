import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private api_url = '/jobs';

  private favoriteJobs : Job[] =[];

  constructor(private http: HttpClient) { }

  // Get All Job List from the API
  getAllJobList() : Observable<Job[]> {
    return this.http.get<Job[]>(this.api_url)
    .pipe(catchError((error) => this.errorHandler(error)));
  }
//get all favorite Jobs List
  getAllFavoriteJobList(): Job[] {
    return this.favoriteJobs;
}
// select and remove a job from the list of favorite Jobs
selectAndRemoveFavoriteJob(job: Job){
  const index = this.favoriteJobs.findIndex(favoriteJobs => favoriteJobs.id === job.id);
  if(index === -1){
    this.favoriteJobs.push(job);
  }else{
    this.favoriteJobs.splice(index , 1);
  }
}
  errorHandler(error: Error) {
    return throwError(error);
  }
}
