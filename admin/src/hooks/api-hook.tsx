import { FormType, FormWithFieldsType, ResponseBoolean, FormSendType } from "../pages/ListPage/ListPage";
import useHttp, { RequestTypeEnum } from "./http-hook";

const mountUrl = (uri: string|null): string => {
    const BASE_PATH = '/wp-json/mdf/v1/forms/';
    let url = '';

    if(process.env.NODE_ENV !== 'development') url = BASE_PATH;
    else url = `//${window.location.hostname}${BASE_PATH}`;

    return uri ? url+uri : url;
}

const useApi = () => {
    const { isLoading, error, setError, req } = useHttp();

    const list = (): Promise<FormType[]> => req({ url:mountUrl(null) });

    const load = (id:string): Promise<FormWithFieldsType> => req({ url:mountUrl(id) });

    const send = (id:string|number|null, body:FormSendType): Promise<ResponseBoolean> => req({
        url:mountUrl(id ? id.toString(): null),
        method:RequestTypeEnum.POST,
        headers: { 'Content-Type': 'application/json'},
        body: body
    });

    const destroy = (formId:string|number, fieldId?:string|number): Promise<ResponseBoolean> => req({
        url: fieldId ? mountUrl(`${formId.toString()}/fields/${fieldId}`) : mountUrl(formId.toString()),
        method:RequestTypeEnum.DELETE
    });

    return {
        isLoading,
        error,
        setError,
        list,
        load,
        send,
        destroy
    }
}

export default useApi;