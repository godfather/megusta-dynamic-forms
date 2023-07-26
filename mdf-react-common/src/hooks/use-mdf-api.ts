import { useState } from 'react';
import { 
    FormSendType, 
    FormType, 
    FormWithFieldsType, 
    RequestConfig, 
    RequestTypeEnum, 
    ResponseBoolean 
} from '../types';

const mountUrl = (uri: string|null): string => {
    const BASE_PATH = '/wp-json/mdf/v1/forms/';
    let url = '';

    if(process.env.NODE_ENV !== 'development') url = BASE_PATH;
    else url = `//${window.location.hostname}${BASE_PATH}`;

    return uri ? url+uri : url;
}

const useMDFApi = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string|null>(null);

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

    const req = <T,>(requestConfig: RequestConfig): Promise<T> => {
        setIsLoading(true);
        setError(null);

        return fetch(requestConfig.url, {
            method: requestConfig.method || RequestTypeEnum.GET,
            headers: requestConfig.headers || {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }).then(response => {
            if(!response.ok) throw Error('Request failed!');
            setIsLoading(false);
            return response.json();
        }).then(data => data as T);
    }

    return {
       isLoading, 
       error,
       setError,
       list,
       load,
       send,
       destroy,
       req 
    }
}

export default useMDFApi;