import { FieldTypesEnum } from "../components/FieldFactory/FieldFactory";

export type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
}

export default class Field {
    public position: number;
    public options: string[];
    public name: string;
    public tip: string;
    public _validations: string[];
    private _id: string;

    constructor(
        private _type: FieldTypesEnum,
        private _label: string,
        private _htmlType: string
    ) {
        this.position = 0;
        this.options = [ 'option 1', 'option 2', 'option 3'];
        this._id = Date.now().toString();
        this.name = this._label.replace(/\s+/ig, '_').toLowerCase();
        this.tip = '';
        this._validations = [];

        this._initializeValidationsByFieldType();
    }

    public get id() {
        return this._id;
    }

    public get type():FieldTypesEnum {
        return this._type;
    }

    public get label():string {
        return this._label;
    }

    public get htmlType():string {
        return this._htmlType;
    }

    private _initializeValidationsByFieldType():void {
        if(this._type === FieldTypesEnum.EMAIL) this._validations.push('email');
    }
}