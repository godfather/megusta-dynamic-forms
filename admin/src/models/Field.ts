import { FieldTypesEnum } from "../components/FieldFactory/FieldFactory";

export type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
}

export default class Field {
    public position: number;
    public options: string[];
    public name: string | undefined;
    public tip: string;
    public min: string;
    public max: string;
    private _validations: string[];
    private _id: string;

    constructor(
        private _type: FieldTypesEnum,
        private _label: string,
        private _htmlType: string
    ) {
        this.position = 0;
        this.options = [ 'option 1', 'option 2', 'option 3'];
        this._id = Date.now().toString();
        this.name = '';
        this.tip = '';
        this.min = '0';
        this.max = '';
        this._validations = [];

        this._initializeValidationsByFieldType();
    }

    public get id() {
        return this._id;
    }

    public set id(newId:string) {
        this._id = newId;
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

    public get defaulName(): string {
        return this.name ? this.name : this._label.replace(/\s+/ig, '_').toLowerCase()
    }

    private _initializeValidationsByFieldType():void {
        if(this._type === FieldTypesEnum.EMAIL) this._validations.push('email');
    }
}