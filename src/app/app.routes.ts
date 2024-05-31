import { Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo:"/jobs",
        pathMatch:"full",
    },
    {
        path:"jobs",
        loadComponent:()=> import('./job-list/job-list.component').then(m=> m.JobListComponent) 
            
    },
    {
        path:"favorites",
        loadComponent:()=> import('./favorite-job/favorite-job.component').then(m=>m.FavoriteJobComponent)
            
    },
    {
        path:"jobs/:id",
        loadComponent:()=> import('./job-detail/job-detail.component').then(m=>m.JobDetailComponent) 
    },
    { path: '**', component: JobListComponent }
];
