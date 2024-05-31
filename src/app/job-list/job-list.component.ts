import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../model/job';
import { Subscription } from 'rxjs';
import { JobService } from '../service/job.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit ,OnDestroy {

  jobs: Job[]=[];

  favoriteJobs!: Job[];
  subscription$ :Subscription | undefined;

  constructor(private jobService : JobService){

  }
  ngOnInit() : void{
    this.getAllJobs();
    this.getFavoriteJobs();

  }

  // Calling service method for fetch a list of jobs
  getAllJobs(){
    this.subscription$ = this.jobService.getAllJobList().subscribe(
      (data)=>{
        this.jobs = data;
      },
      (error)=>{
        alert('Error getting All Jobs: '+error.massages);
      })
    
  }
// Calling service method for fetch a list of Favorite jobs
  getFavoriteJobs(){
    this.favoriteJobs = this.jobService.getAllFavoriteJobList();
  }

 // The click on the star should be managed in order to add or remove the selected job in a favorite list
selectAndRemoveFavorite(job:Job){
this.jobService.selectAndRemoveFavoriteJob(job);
}
// we are checking job is in the list of favorite jobs list
isFavorite(jobId: number) : boolean{
  return this.favoriteJobs.some(job=> job.id === jobId);

}
  //unsubscribe job service method
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
