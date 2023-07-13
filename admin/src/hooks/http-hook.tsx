import { useState } from "react";

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

const useHttp = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string|null>(null);

    const sendRequest = (requestConfig: RequestConfig, successCallback: (response: any) => void) => {
        setIsLoading(true);
        setError(null);

        fetch(requestConfig.url, {
            method: requestConfig.method || RequestTypeEnum.GET,
            headers: requestConfig.headers || {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }).then(response => {
            if(!response.ok) throw Error('Request failed!');
            successCallback(response);
            setIsLoading(false);
        }).catch(error => {
            // console.log(error.message);
            setError(error.message || 'Unknow error!');
            setIsLoading(false);
        })
    }

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
        sendRequest,
        req
    }
}

export default useHttp;