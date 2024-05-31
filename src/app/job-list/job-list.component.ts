import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../model/job';
import { Subscription } from 'rxjs';
import { JobService } from '../service/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit ,OnDestroy {

  jobs: Job[]=[];

  subscription$ :Subscription | undefined;

  constructor(private jobService : JobService){

  }
  ngOnInit() : void{
    this.getAllJobs();

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

  //unsubscribe job service method
  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
