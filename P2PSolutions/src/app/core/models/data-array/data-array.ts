export interface IDataArray {
    data?: any[];
    tempData?: any[];
}
export class DataArray implements IDataArray {
    data?: any[];
    tempData?: any[];

    constructor(data: IDataArray) {
        this.data = data.data;
        this.tempData = data.tempData;
    }
}
