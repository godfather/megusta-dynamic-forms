export enum RequestTypeEnum {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
};

export type RequestConfig = {
    url: string;
    method?: RequestTypeEnum;
    headers?: {};
    body?: any;
}

export type FormType = {
    id: number;
    form_name: string;
    created_at: string;
    updated_at: string;
}

export type FormSendType = {
    name: string|null;
    fields: OutputType[];
}

export interface FormWithFieldsType extends FormType{
    id: number;
    form_name: string;
    created_at: string;
    updated_at: string;
    fields?: APIFieldLoad[];
}

export type ResponseBoolean = {
    success: boolean;
    id?: string|number;
}


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

export type OutputType = {
    id?: string;
    position: number;
    field_name: string;
    field_label: string;
    field_tip: string;
    field_type: string;
    field_validations: string;
    field_options?: string;
}

export enum FieldTypesEnum {
    TEXT_FIELD = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    CHECKBOX = 'CHECKBOX',
    CHECKBOX_GROUP = 'CHECKBOX_GROUP',
    RADIO_GROUP = 'RADIO_GROUP',
    FILE = 'FILE',
    EMAIL = 'EMAIL',
}

export type FormRegistrationFields = {
    field_id: number;
    field_value: string;
    validation?:{
        valid: boolean,
        errors: string[]
    };
}

export type FromContextType = {
    formId: number|null;
    fields: FormRegistrationFields[];
    formValid:boolean;
    setFormId: (formId:number) => void,
    add: (value:FormRegistrationFields, rules:string) => void;
    get: (fieldId: number) => FormRegistrationFields|undefined;
    submitData: () => { form_id: number, fields: FormRegistrationFields[] } | null;
}
