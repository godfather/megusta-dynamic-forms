export enum FieldTypesEnum {
    TEXT_FIELD = 'TEXT_FIELD',
    TEXTAREA = 'TEXTAREA',
}

export default class Field {
    public position: number;

    constructor(
        private _type: FieldTypesEnum,
        private _label: string,
        private _htmlType: string
    ) {
        this.position = 0;
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
}