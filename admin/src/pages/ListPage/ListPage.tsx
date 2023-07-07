import { Link } from "react-router-dom";
import { basePath } from "../../routes/routes";
import { useEffect, useState } from "react";
import useApi from "../../hooks/api-hook";
import Table from "../../components/ui/Table/Table";
import Box from "../../components/ui/Box/Box";

type FormType = {
    id: number;
    form_name: string;
    created_at: string;
    updated_at: string;
}

const ListPage = () => {
    const [ headers, setHeaders ] = useState<string[]>([]);
    const [ rows, setRows ] = useState<(string|number|boolean)[][]>([]);
    const { isLoading, error, sendRequest } = useApi();

    useEffect(() => {
        sendRequest({ url: 'http://local.woo.com/wp-json/mdf/v1/forms/' }, async (response) => {
            const data: FormType[] = await response.json();
            //check if data has elements before continue;

            setHeaders(Object.keys(data[0]));
            const rows = data.map(row => Object.values(row));
            setRows(rows);
            
        });        
    }, []);


    return (
        <Box title="forms">
            <Table headers={headers} rows={rows} />            
        </Box>
    );
}

export default ListPage;