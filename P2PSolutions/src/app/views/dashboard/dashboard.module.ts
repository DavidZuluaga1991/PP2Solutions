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
import { HomeComponent } from './pages/home/home.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadComponent,
    UploadComponent,
    HomeComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpService
  ]
})
export class DashboardModule { }
