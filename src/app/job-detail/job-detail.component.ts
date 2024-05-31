import { Component } from '@angular/core';
import { JobDetails } from '../model/job';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent {
jobDetils: JobDetails | undefined;
jobId: number | undefined;
constructor(private jobService: JobService , private route: ActivatedRoute,private router: Router){

}
  ngOnInit(){
  this.route.params.subscribe(params=>{
  this.jobId = +params['id'];
  this.getJobDetails(this.jobId);
  })
  }

  // get the job details by job id
  getJobDetails(jobId: number) {
    this.jobService.getJobDetailsById(jobId).subscribe((data)=>{
      this.jobDetils = data;
    },(error)=>{
    alert("Error :" + error.massages);
    this.backToHome();
    })
  }

  // redirect to joblist page
  backToHome():void{
    this.router.navigate(['/jobs'])
  }
}
