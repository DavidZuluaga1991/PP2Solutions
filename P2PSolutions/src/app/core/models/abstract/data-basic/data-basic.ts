import { HttpService } from 'src/app/core/https/http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { DataAutocomplete } from 'src/app/core/models/data-autocomplete/data-autocomplete';

export abstract class DataBasic {
    protected api: HttpService;
    protected localStorage: LocalStorageService;
    public fb: FormBuilder;
    public formData: FormGroup;
    public displayCols: { tittle: string, key: string, tooltip?: string }[] = [
        {
            tittle: 'Nit Compañia',
            key: 'partnerId'
        },
        {
            tittle: 'Nombre Compañia',
            key: 'nameCompany'
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
    public data: any[];
    public focusData: DataAutocomplete;
    public url = '';
    public actionData = 'ENVIADOS';
    public typeDocs = [];
    constructor(injector: Injector) {
        this.api = injector.get(HttpService);
        this.localStorage = injector.get(LocalStorageService);
        this.fb = injector.get(FormBuilder);
        this.url = `${this.localStorage.getItemString('country')}/empresas/${this.localStorage.getItemString('nit')}/`;
    }

    private viewDate(dateView: any): string {
        const date = new Date(dateView);
        const year = date.getFullYear();
        const rawMonth = date.getMonth() + 1;
        const month = rawMonth < 10 ? '0' + rawMonth : rawMonth;
        const rawDay = date.getDate();
        const day = rawDay < 10 ? '0' + rawDay : rawDay;
        return day + '/' + month + '/' + year;
    }

    public tableData() {
        const tempUrl = `${this.url}documentos?accion=${ this.actionData }&tipodocumento=${ this.formData.get('type').value }`;
        this.api.get(tempUrl).then((result) => {
        this.data = [];
        result.documents.forEach((d: any) => {
          this.data.push(
            {
              companyId: d.companyId,
              partnerId: d.partnerId,
              nameCompany: d.nameCompany,
              documentType: d.documentType,
              documentId: d.documentId,
              country: d.country,
              documentDate: this.viewDate(d.documentDate),
              documentDelivery: this.viewDate(d.documentDelivery),
              file: d.fileNameOutput.split('/')[d.fileNameOutput.split('/').length - 1],
              urlfileo: this.actionData === 'ENVIADOS' ? d.fileNameOutput : d.fileNameInput,
              status: d.status
            }
          );
        });
      });
    }

    public searchData(search: string) {
      this.formData.patchValue({
        type: search
      });
      this.tableData();
      this.focusDataField('', false);
    }

    public focusDataField(focusControl: string, visibleControl?: boolean) {
      this.focusData = {
        control: focusControl,
        visible: visibleControl === undefined ? true : visibleControl
      };
    }

    public visibleData(control: string): boolean {
      return this.focusData.control === control && this.focusData.visible;
    }
}
