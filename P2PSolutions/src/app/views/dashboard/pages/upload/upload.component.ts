import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { DataBasic } from 'src/app/core/models/abstract/data-basic/data-basic';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends DataBasic implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }// /api/v1/CO/empresas/12313/relcial/1312313/socios

  ngOnInit(): void {
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
