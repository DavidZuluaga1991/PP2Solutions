export interface IDataAutocomplete {
    control: string;
    visible: boolean;
}
export class DataAutocomplete implements IDataAutocomplete {
    control: string;
    visible: boolean;

    constructor(autocomplete: IDataAutocomplete) {
        this.control = autocomplete.control;
        this.visible = autocomplete.visible;
    }
}
