import { useEffect, useState } from "react"
import { useMDFApi } from "../../hooks"
import { APIFieldLoad } from "../../types"
import FieldFactory from "../FieldFactory/FieldFactory"

const Form: React.FC<{ formId:string}> = ({ formId }) => {
    const { isLoading, error, setError, load } = useMDFApi()
    const [ fields, setFields ] = useState<APIFieldLoad[]>([]);

    const loadFormStructure = async (formId:string) => {
        const data = await load(formId);
        if(error) return;
        setFields(data.fields!);
    }

    useEffect(() => {
        loadFormStructure(formId);
    }, [formId])
    return (
        <div>
            {fields.length && fields.map(field => <FieldFactory key={field.id} field={field} />) }
        </div>
    )
}

export default Form;