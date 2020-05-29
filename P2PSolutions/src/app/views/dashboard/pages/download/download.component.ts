import { Component, OnInit, Injector } from '@angular/core';
import { HttpService } from 'src/app/core/https/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataAutocomplete } from 'src/app/core/models/data-autocomplete/data-autocomplete';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { DataBasic } from 'src/app/core/models/abstract/data-basic/data-basic';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent extends DataBasic implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.actionData = 'RECIBIDOS';
    this.formData = this.fb.group({
      type: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
    this.focusDataField('', false);
    this.api.get(this.url + 'tipodocumentos').then((result) => {
      this.typeDocs = result.types;
      this.formData.patchValue({
        type: this.typeDocs[0].name
      });
      this.tableData();
    });
  }
}
