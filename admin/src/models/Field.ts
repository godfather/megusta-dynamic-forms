import { FieldTypesEnum } from "../components/FieldFactory/FieldFactory";

export type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
}

type OutputType = {
    position: number;
    field_name: string;
    field_label: string;
    field_tip: string;
    field_type: string;
    field_validations: string;
    field_options?: string;
}

export default class Field {
    public position: number;
    public options: string[];
    public name: string | undefined;
    public tip: string;
    public min: string;
    public max: string;
    public required: boolean;
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
        this.required = false;

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

    public toJson() {
        const output: OutputType = {
            position: this.position,
            field_name: this.name!,
            field_label: this._label,
            field_tip: this.tip,
            field_type: this._htmlType.toLowerCase(),
            field_validations: this._getValidations(),
            field_options: this.options.join(';')
        }

        if(this._type !== FieldTypesEnum.CHECKBOX_GROUP && this._type !== FieldTypesEnum.RADIO_GROUP) {
            delete output.field_options;
        }

        return output;
    }

    private _getValidations(): string {
        const validations: string[] = [];
        if(this.required) validations.push('required');
        if(this.min) validations.push('min:' + this.min);
        if(this.max) validations.push('max:' + this.max);

        const finalValidations = this._validations.concat(validations);
        return finalValidations.join(';');
    }

    private _initializeValidationsByFieldType():void {
        if(this._type === FieldTypesEnum.EMAIL) this._validations.push('email');
    }
}