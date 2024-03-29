import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/https/http.service';
import { DataAutocomplete } from 'src/app/core/models/data-autocomplete/data-autocomplete';
import { DataArray } from 'src/app/core/models/data-array/data-array';
import { SendFiles } from 'src/app/core/models/send-files/send-files';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public formFile: FormGroup;
  public arraysData: { country: DataArray, type: DataArray, receptor: DataArray } = { country: {}, type: {}, receptor: {} };
  public focusData: DataAutocomplete;
  public arraysFile: SendFiles[] = [];
  public sendFiles: SendFiles[] = [];
  public selectAction = 0;
  private url = `${this.localStorage.getItemString('country')}/empresas/${this.localStorage.getItemString('nit')}/`;

  constructor(private fb: FormBuilder,
              private api: HttpService,
              private localStorage: LocalStorageService) {
    this.formFile = this.fb.group({
      country: new FormControl('', [Validators.required]),
      emisor: new FormControl({ value: localStorage.getItemString('nit'), disabled: true }, [Validators.required]),
      receptor: new FormControl({ value: '', disabled: true }, [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      file: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
    this.getCountry();
    this.focusDataField('', false);
  }

  ngOnInit(): void { }
  private getCountry() {
    this.arraysData.country.data = [];
    this.arraysData.country.tempData = [];
    this.api.get(this.url + 'tipodocumentos').then((result) => {
      this.arraysData.type.data = result.types;
      this.arraysData.type.tempData = Object.assign([], this.arraysData.type.data);
    });

    this.api.get(this.url + 'abvpais').then((result) => {
      this.arraysData.country.data = result.data;
      this.arraysData.country.tempData = Object.assign([], result.data);
    });
  }

  private filterData(list: any[], word: string) {
    return list.filter((el) => el.name.toLowerCase().indexOf(word.toLowerCase()) > -1);
  }

  public autocomplete(control: string) {
    this.focusDataField(control, true);
    const word = this.formFile.get(control).value.toLowerCase();
    const temp = this.arraysData[control].tempData;
    const tempList = temp ? this.filterData(temp, word) : temp;
    this.arraysData[control].data = word === '' && temp ? temp : tempList;
  }

  public setData(control: string, data: string) {
    this.formFile.patchValue({
      country: (control === 'country' ? data : this.formFile.get('country').value),
      type: (control === 'type' ? data : this.formFile.get('type').value),
      receptor: (control === 'receptor' ? data : this.formFile.get('receptor').value)
    });
    this.focusDataField('', false);
    if (control === 'type') {
      this.api.get(`${this.url}relcial/${this.formFile.get('type').value}/socios`).then((result: any) => {
        this.arraysData.receptor.data = [];
        result.sociosComerciales.forEach(partner => {
          this.arraysData.receptor.data.push({ name: (`${partner.nit} - ${partner.nombre}`) });
        });
        this.arraysData.receptor.tempData = Object.assign([], this.arraysData.receptor.data);
      });
    }
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

  public disableFile() {
    if (this.formFile.get('identification').value) {
      this.formFile.controls.file.enable();
    } else {
      this.formFile.controls.file.disable();
    }
  }
  public upload(event: any) {
    let name = this.filterData(this.arraysData.country.tempData, this.formFile.get('country').value)[0].iso2;
    name += `_${this.formFile.get('emisor').value}_${this.formFile.get('receptor').value.split('-')[0].trim()}_`;
    name += this.formFile.get('type').value;
    if (event.length > 0) {
      let contFiles = +this.formFile.get('identification').value;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.length; i++) {
        console.log(event[i].name.split('.'));
        const extension = event[i].name.split('.');
        this.arraysFile.push({
          fileName: `${name}_${contFiles}.${extension[extension.length - 1]}`,
          file: event[i],
          typedocument: this.formFile.get('type').value,
          partner: this.formFile.get('receptor').value,
          documentId: contFiles.toString()
        });
        contFiles++;
      }
    }
  }

  public sendFile() {
    this.sendFiles = [];
    this.arraysFile.forEach((file: SendFiles) => {
      this.transforBase64(file);
    });
  }

  private transforBase64(file: SendFiles) {
    // Select the very first file from list
    const fileToLoad = file.file;
    // FileReader function for read the file.
    const fileReader = new FileReader();
    let base64: any;
    // Onload of file read the file content
    fileReader.onload = (fileLoadedEvent) => {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      this.sendData(file, base64);
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  }

  private sendData(file: SendFiles, base64: any) {
    const tempfile = Object.assign({}, file);
    tempfile.file = base64;
    this.api.post(`${this.url}documentos/upload`, tempfile).then((result) => {
      console.log(result);
    });
  }
}
