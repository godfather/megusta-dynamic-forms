import React from "react";

type TableCol = {
    [key: string]: string|boolean|number
}

type TableProps = {
    headers: string[];
    rows: (string|number|boolean)[][];
}


const Table: React.FC<TableProps> = (props) => {
    return (
        <table>
            <thead>{ props.headers.map((header, i) => <th key={i}>{header}</th>) }</thead>
            <tbody>{ props.rows.map(row => <TableRow row={row} />)}</tbody>
        </table>
    )
}

const TableRow: React.FC<{ row: (string|number|boolean)[]; }> = (props) => {
    return (
        <tr>
            { props.row.map((val, i) => <td key={i}>{val}</td>) }
        </tr>
    );
}

export default Table;