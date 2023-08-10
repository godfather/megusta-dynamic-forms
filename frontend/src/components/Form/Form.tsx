import { FormEvent, MouseEvent, PropsWithChildren, useEffect, useState } from "react"
import { useMDFApi } from "../../hooks"
import { APIFieldLoad } from "../../types"
import FieldFactory from "../FieldFactory/FieldFactory"
import StatusBar, { StatusBarTypeEnum } from "../UI/StatusBar/StatusBar"
import FieldContainer from "../FieldFactory/Fields/FieldContainer"
// import useValidation from "../../hooks/use-validation";


const Form: React.FC<{ formId:string}> = ({ formId }) => {
    const { isLoading, error, setError, load, req } = useMDFApi()
    const [ fields, setFields ] = useState<APIFieldLoad[]>([]);

    const closeStatusBarHandler = (event:MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        setError(null);
    }

    const submitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(fields);
    }

    useEffect(() => {
        load(formId)
            .then(data => setFields(data.fields || []))
            .catch(error => setError(error.message));
    }, [formId]);

    return (
        <form onSubmit={submitHandler}>
            { error && <StatusBar type={StatusBarTypeEnum.ERROR} message={error} onClick={closeStatusBarHandler}/>}
            {fields.length > 0 && fields.map(field => <FieldFactory  field={field} />) }
            <FieldContainer>
                <button type="submit">send</button>
            </FieldContainer>
        </form>
    )
}

export default Form;