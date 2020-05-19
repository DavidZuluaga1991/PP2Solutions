import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/https/http.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  public data: any[];
  public displayCols: { tittle: string, key: string, tooltip?: string }[] = [
    {
      tittle: 'Nit Compañia',
      key: 'companyId'
    },
    {
      tittle: 'País',
      key: 'country'
    },
    {
      tittle: 'Fecha de Documento',
      key: 'documentDate'
    },
    {
      tittle: 'Entrega de Documento',
      key: 'documentDelivery'
    },
    {
      tittle: 'Tipo de Documento',
      key: 'documentType'
    },
    {
      tittle: 'Documento',
      tooltip: 'file',
      key: 'urlfile'
    }
  ];
  constructor(private router: Router, private api: HttpService) { }

  ngOnInit(): void {
    this.api.get('file.json').then((result) => {
      this.data = [];
      result.data.forEach(d => {
        this.data.push(
          {
            companyId: d.companyId,
            country: d.country,
            documentType: d.documentType,
            documentDate: d.documentDate,
            documentDelivery: d.documentDelivery,
            file: d.fileNameOutput.split('/')[d.fileNameOutput.split('/').length - 1],
            urlfile: d.fileNameOutput
          }
        );
      });
      console.log(this.data);
    });
  }


}
