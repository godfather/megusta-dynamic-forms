import { FormEvent, MouseEvent, useContext, useEffect, useState } from "react"
import { useMDFApi } from "../../hooks"
import { APIFieldLoad } from "../../types"
import FieldFactory from "../FieldFactory/FieldFactory"
import StatusBar, { StatusBarTypeEnum } from "../UI/StatusBar/StatusBar"
import FieldContainer from "../FieldFactory/Fields/FieldContainer"
import { FormContext } from "../../store/form-context"


const Form: React.FC<{ formId:string}> = ({ formId }) => {
    const { isLoading, error, setError, load } = useMDFApi()
    const [ fields, setFields ] = useState<APIFieldLoad[]>([]);
    const formContext = useContext(FormContext);

    const closeStatusBarHandler = (event:MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        setError(null);
    }

    const submitHandler = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isLoading) return;
        formContext.submit();
    }

    useEffect(() => {
        formContext.setFormId(parseInt(formId));
        load(formId)
            .then(data => setFields(data.fields || []))
            .catch(error => setError(error.message));
    }, []);

    return (
            <form onSubmit={submitHandler}>
                { error && <StatusBar type={StatusBarTypeEnum.ERROR} message={error} onClick={closeStatusBarHandler}/>}
                {fields.length > 0 && fields.map((field, i) => <FieldFactory  key={i} field={field} />) }
                <FieldContainer>
                    <button type="submit" disabled={!formContext.formValid}>send</button>
                </FieldContainer>
            </form>
    )
}

export default Form;