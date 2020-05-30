import { DataArray } from '../data-array/data-array';

export interface ISendFiles {
    fileName: string;
    file: any;
    typedocument: string;
    partner: string;
    documentId: string;
}
export class SendFiles implements ISendFiles {
    fileName: string;
    file: any;
    typedocument: string;
    partner: string;
    documentId: string;

    constructor(sendfiles: ISendFiles) {
        this.fileName = sendfiles.fileName;
        this.file = sendfiles.file;
        this.typedocument = sendfiles.typedocument;
        this.partner = sendfiles.partner;
        this.documentId = sendfiles.documentId;
    }
}

