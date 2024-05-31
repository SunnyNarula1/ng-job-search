import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job';
import { JobService } from '../service/job.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-favorite-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-job.component.html',
  styleUrl: './favorite-job.component.css'
})
export class FavoriteJobComponent implements OnInit {
favoriteJobs: Job[] =[];

constructor(private jobService: JobService){

}
ngOnInit(){
 this.getAllFavoriteJobs();
}

// Calling service method for fetch a list of  Favorite jobs
getAllFavoriteJobs(){
  this.favoriteJobs = this.jobService.getAllFavoriteJobList();

}
}
