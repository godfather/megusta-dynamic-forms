import { Link } from "react-router-dom";
import { basePath } from "../../routes/routes";
import { useEffect, useState } from "react";
import useApi from "../../hooks/api-hook";
import Table from "../../components/ui/Table/Table";
import Box from "../../components/ui/Box/Box";
import { APIFieldLoad, OutputType } from "../../models/Field";

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

const ListPage = () => {
    const [ headers, setHeaders ] = useState<string[]>([]);
    const [ rows, setRows ] = useState<(string|number|boolean)[][]>([]);
    const { isLoading, error, setError, list } = useApi();

    useEffect(() => {
        list().then(response => {
            setHeaders(Object.keys(response[0]));
            const rows = response.map(row => Object.values(row));
            setRows(rows);     
        }).catch(error => setError(error.message));
    }, []);


    return (
        <Box title="forms">
            { error && <p>{error}</p> }
            <Table headers={headers} rows={rows} />            
        </Box>
    );
}

export default ListPage;