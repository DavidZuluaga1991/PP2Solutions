import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DownloadComponent } from './pages/download/download.component';
import { UploadComponent } from './pages/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/core/https/http.service';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ]
})
export class DashboardModule { }
