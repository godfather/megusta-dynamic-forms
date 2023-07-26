/// <reference types="react" />
import * as react from 'react';

declare enum RequestTypeEnum {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}
type RequestConfig = {
    url: string;
    method?: RequestTypeEnum;
    headers?: {};
    body?: any;
};
type FormType = {
    id: number;
    form_name: string;
    created_at: string;
    updated_at: string;
};
type FormSendType = {
    name: string | null;
    fields: OutputType[];
};
interface FormWithFieldsType extends FormType {
    id: number;
    form_name: string;
    created_at: string;
    updated_at: string;
    fields?: APIFieldLoad[];
}
type ResponseBoolean = {
    success: boolean;
    id?: string | number;
};
type FieldBaseType = {
    type: FieldTypesEnum;
    label: string;
    htmlType: string;
};
type APIFieldLoad = {
    id: number;
    form_id: number;
    position: number;
    field_type: string;
    field_name: string;
    field_label: string;
    field_tip: string;
    field_validations: string;
    field_options: string | null;
    field_css: string | null;
    created_at: string;
    updated_at: string;
};
type OutputType = {
    id?: string;
    position: number;
    field_name: string;
    field_label: string;
    field_tip: string;
    field_type: string;
    field_validations: string;
    field_options?: string;
};
declare enum FieldTypesEnum {
    TEXT_FIELD = "TEXT",
    TEXTAREA = "TEXTAREA",
    CHECKBOX = "CHECKBOX",
    CHECKBOX_GROUP = "CHECKBOX_GROUP",
    RADIO_GROUP = "RADIO_GROUP",
    FILE = "FILE",
    EMAIL = "EMAIL"
}

declare const useMDFApi: () => {
    isLoading: boolean;
    error: string | null;
    setError: react.Dispatch<react.SetStateAction<string | null>>;
    list: () => Promise<FormType[]>;
    load: (id: string) => Promise<FormWithFieldsType>;
    send: (id: string | number | null, body: FormSendType) => Promise<ResponseBoolean>;
    destroy: (formId: string | number, fieldId?: string | number) => Promise<ResponseBoolean>;
    req: <T>(requestConfig: RequestConfig) => Promise<T>;
};

export { APIFieldLoad, FieldBaseType, FieldTypesEnum, FormSendType, FormType, FormWithFieldsType, OutputType, RequestConfig, RequestTypeEnum, ResponseBoolean, useMDFApi };
