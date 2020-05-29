import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public initOptions = [
    { text: 'Graficas', icon: 'insert_chart_outlined', route: ''},
    { text: 'Perfil', icon: 'person', route: ''},
    { text: 'Ajustes', icon: 'settings', route: ''},
    { text: 'Descargas', icon: 'cloud_download', route: '/dashboard/download'},
    { text: 'Enviados', icon: 'cloud_upload', route: '/dashboard/upload'},
    { text: 'Enviar Documentos', icon: 'cloud_upload', route: '/dashboard/file_upload'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
