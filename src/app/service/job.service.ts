import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job, JobDetails } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private api_url = '/jobs';

  private favoriteJobs : Job[] =[];
  private favoritesKey: string = 'favorites';

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

  // Get favorite jobs from local storage
  getFavorites(): Job[] {
    const favorites: string | null = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }
  
  // select and remove a job from the list of favorite Jobs
  selectAndRemoveFavoriteJob(job: Job){
  const favorites = this.getFavorites();
  const index = favorites.findIndex(favorites => favorites.id === job.id);
  if(index === -1){
    favorites.push(job);
  }else{
    favorites.splice(index , 1);
  }
  localStorage.setItem(this.favoritesKey, JSON.stringify(favorites))
  }
  // get the job details by job id
  getJobDetailsById(id:number): Observable<JobDetails>{
    return this.http.get<JobDetails>(`${this.api_url}/${id}`)
    .pipe(catchError((error)=> this.errorHandler(error)));
  }
  isFavorited(jobId :number): boolean{
    return this.getFavorites().some(favorite=>favorite.id ===jobId);

  }

  errorHandler(error: Error) {
    return throwError(error);
  }
}
