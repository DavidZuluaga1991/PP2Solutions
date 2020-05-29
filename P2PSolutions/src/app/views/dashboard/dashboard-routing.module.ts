import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { DownloadComponent } from './pages/download/download.component';
import { UploadComponent } from './pages/upload/upload.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'download',
        component: DownloadComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'file_upload',
        component: UploadFileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
