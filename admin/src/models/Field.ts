import { FieldTypesEnum } from "../components/FieldFactory/FieldFactory";

export type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
}

export type APIFieldLoad = {
    id: number;
    form_id: number;
    position: number;
    field_type: string;
    field_name: string;
    field_label: string;
    field_tip: string;
    field_validations: string;
    field_options: string|null;
    field_css: string|null
    created_at: string;
    updated_at: string;
}

type OutputType = {
    id?: string;
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
        this._id = Math.random().toString(36).substring(2, 6);
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
            id: this.id,
            position: this.position,
            field_name: this.name!,
            field_label: this._label,
            field_tip: this.tip,
            field_type: this.type.toLowerCase(),
            field_validations: this._getValidations(),
            field_options: this.options.join(';')
        }

        if(this._type !== FieldTypesEnum.CHECKBOX_GROUP && this._type !== FieldTypesEnum.RADIO_GROUP) {
            delete output.field_options;
        }

        if(/[a-z]/ig.test(this.id)) delete output.id;

        return output;
    }

    public load(field: APIFieldLoad) {
        this._id = field.id.toString();
        this.position = field.position;
        this.name = field.field_name;
        this.tip = field.field_tip;
        
        if(field.field_options) this.options = field.field_options.split(';');
        if(field.field_validations) this._loadValidation(field.field_validations);
    }

    private _getValidations(): string {
        const validations: string[] = [];
        if(this.required) validations.push('required');
        if(this.min) validations.push('min:' + this.min);
        if(this.max) validations.push('max:' + this.max);

        const finalValidations = this._validations.concat(validations);
        return finalValidations.join(';');
    }

    private _loadValidation(validations: string) {
        const arrValidations = validations.split(';');
        arrValidations.forEach(val => {
            if(val === 'required') this.required = true;
            else if(/min/.test(val)) this.min = val.split(':')[1];
            else if(/max/.test(val)) this.max = val.split(':')[1];
        })
        
    }

    private _initializeValidationsByFieldType():void {
        if(this._type === FieldTypesEnum.EMAIL) this._validations.push('email');
    }
}