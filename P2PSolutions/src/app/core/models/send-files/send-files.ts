import { DataArray } from '../data-array/data-array';

export interface ISendFiles {
    fileName: string;
    file: any;
}
export class SendFiles implements ISendFiles {
    fileName: string;
    file: any;

    constructor(sendfiles: ISendFiles) {
        this.fileName = sendfiles.fileName;
        this.file = sendfiles.file;
    }
}

