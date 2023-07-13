import React from "react";
import css from './Table.module.scss';
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Folder } from 'react-feather';

type TableCol = {
    [key: string]: string|boolean|number
}

type TableProps = {
    headers: string[];
    rows: (string|number|boolean)[][];
    onDelete: (formId: string) => void;
}


const Table: React.FC<TableProps> = (props) => {
    return (
        <table className={css.mdftable} cellSpacing={0}>
            <thead>
                <tr>{ props.headers.concat('actions').map((header, i) => <th key={i}>{header}</th>) }</tr>
            </thead>
            <tbody>{ props.rows.map(row => <TableRow row={row} onDelete={props.onDelete} />)}</tbody>
        </table>
    )
}

const TableRow: React.FC<{ row: (string|number|boolean)[]; onDelete: (formId: string) => void }> = (props) => {
    return (
        <tr>
            { props.row.map((val, i) => <td key={i}>{val}</td>) }
            <TableActions formId={props.row[0]} onDelete={props.onDelete} />
        </tr>
    );
}

const TableActions: React.FC<{ formId:string|number|boolean; onDelete: (formId: string) => void }> = (props) => {
    const navigate = useNavigate();

    const openEditionHandler = (): void => { 
        navigate(`?page=mdf&action=edit&formid=${props.formId}`);
    }

    const deleteHandler = () => { 
        const confirmDeletion = window.confirm('Are yousure about this?');
        if(confirmDeletion) props.onDelete(props.formId as string);
    }
    const viewDataHandler = () => console.log(`Open data from ${props.formId}...`);

    return(
        <td key={`action-${props.formId}`}>
            <button type="button" className={css.data} onClick={viewDataHandler}><Folder size="15" /></button>
            <button type="button" className={css.edit} onClick={openEditionHandler}><Edit size="15"/></button>
            <button type="button" className={css.delete} onClick={deleteHandler}><Trash2 size="15" /></button>
        </td>
    );
}

export default Table;