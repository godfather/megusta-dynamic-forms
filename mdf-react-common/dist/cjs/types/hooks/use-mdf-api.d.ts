/// <reference types="react" />
import { FormSendType, FormType, FormWithFieldsType, RequestConfig, ResponseBoolean } from '../types';
declare const useMDFApi: () => {
    isLoading: boolean;
    error: string | null;
    setError: import("react").Dispatch<import("react").SetStateAction<string | null>>;
    list: () => Promise<FormType[]>;
    load: (id: string) => Promise<FormWithFieldsType>;
    send: (id: string | number | null, body: FormSendType) => Promise<ResponseBoolean>;
    destroy: (formId: string | number, fieldId?: string | number) => Promise<ResponseBoolean>;
    req: <T>(requestConfig: RequestConfig) => Promise<T>;
};
export default useMDFApi;
