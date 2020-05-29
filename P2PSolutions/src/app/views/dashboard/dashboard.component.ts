import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/https/http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public menu = [
    { text: 'Inicio', icon: 'home', route: '/dashboard/home' },
    { text: 'Descargas', icon: 'cloud_download', route: '/dashboard/download' },
    { text: 'Enviados', icon: 'cloud_upload', route: '/dashboard/upload' },
    { text: 'Enviar Documento', icon: 'cloud_upload', route: '/dashboard/file_upload' }
  ];
  public sidenav = true;
  private tempSidenav = false;
  public namePerfil = '';
  constructor(private api: HttpService, private localStorage: LocalStorageService) {
    api.get(`${this.localStorage.getItemString('country')}/empresas/${this.localStorage.getItemString('nit')}`).then((result) => {
      this.namePerfil = result.name;
    });
  }

  ngOnInit(): void {
    this.sidenav = !(window.innerWidth < 655);
    this.tempSidenav = window.innerWidth < 655;
  }

  public sidenavMobile(): string {
    let pru = '';
    if (!this.sidenav || this.tempSidenav) {
      pru = this.sidenav ? '' : 'display_none';
    }
    return pru;
  }
}
