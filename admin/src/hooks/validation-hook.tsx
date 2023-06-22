import { ChangeEvent, useState } from "react";

type ValidationHookProps = {
    value: string;
    isValid: boolean;
    hasError: boolean;
    onChangeHandler: (event:ChangeEvent<HTMLInputElement>) => void;
    onBlurHandler: () => void;
    reset: () => void;
}

const useValidationHook = (initialValue: string, validationFn:(value:string) => boolean): ValidationHookProps => {
    const [ value, setValue ] = useState(initialValue);
    const [ isTouched, setIsTouched ] = useState(false);

    const isValid = validationFn(value);
    const hasError = !isValid && isTouched;

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setIsTouched(false);
    }

    return {
        value,
        isValid,
        hasError,
        onChangeHandler,
        onBlurHandler,
        reset
    }
}

export default useValidationHook;