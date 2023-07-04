import { useState } from "react";

export enum RequestTypeEnum {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
};

type RequestConfig = {
    url: string;
    method?: RequestTypeEnum;
    headers?: {};
    body?: any;
}

const useApi = () => {
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

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useApi;