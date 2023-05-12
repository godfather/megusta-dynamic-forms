import React from "react";

export enum FieldTypesEnum {
    TEXT_FIELD = 'TEXT_FIELD',
    TEXTAREA = 'TEXTAREA',
}

export type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
}

export default class Field {
    public position: number;
    private _id: string;

    constructor(
        private _type: FieldTypesEnum,
        private _label: string,
        private _htmlType: string
    ) {
        this.position = 0;
        this._id = Date.now().toString();
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
}