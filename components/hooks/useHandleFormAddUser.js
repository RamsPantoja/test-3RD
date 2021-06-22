import { useState, useEffect, useCallback } from "react";

export const addClientSchema = {
    firstname: { value: '', errorfield: 'successInput'},
    lastnameFather: { value: '', errorfield: 'successInput'},
    lastnameMother: { value: '', errorfield: 'successInput'},
    gender: { value: '', errorfield: 'successInput'},
    date: { value: '', errorfield: 'successInput'},
    phoneNumber: { value: '', errorfield: 'successInput'}
}

export const addClientValidationSchema = {
    firstname: { required: true},
    lastnameFather: { required: true},
    lastnameMother: { required: true},
    gender: { required: true},
    date: { required: true},
    phoneNumber: { required: true},
}

export const disableSchema = {
    disable: true,
    error: ''
}

const useHandleFormAddClient = (stateSchema, validationSchema = {}, disableSchema) => {
    const [state, setState] = useState(stateSchema);
    const [disable, setDisable] = useState(disableSchema);
    const [isDirty, setIsDirty] = useState(false);


    const validateState = useCallback(() => {
        const hasErrorInState = Object.keys(validationSchema).some((key) => {
            const isInputRequired = validationSchema[key].required;
            const stateValueKey = state[key].value;

            return (isInputRequired && !stateValueKey);
        })

        return hasErrorInState;
    }, [state, validationSchema]);

    useEffect(() => {
        setDisable(() => ({
            ...disableSchema,
            disable: true
        }))
    }, [disableSchema]);

    useEffect(() => {
        if (isDirty) {
            setDisable(() => ({
                ...disableSchema,
                disable: validateState()
            }))
        }

        if (validateState()) {
            setDisable(() => ({
                ...disableSchema,
                error: 'Todos los campos son obligatorios'
            }))
        }
    }, [isDirty, validateState, disableSchema]);

    const handleOnChange = useCallback((e) => {
        setIsDirty(true);

        const name = e.target.name;
        const value = e.target.value;
        let error = 'successInput';

        if (validationSchema[name].required) {
            if (!value) {
                error = 'errorInput'
            }
        }

        setState((prevState) => ({
            ...prevState,
            [name]: { value, errorfield: error}
        }));

    });

    return [handleOnChange, state, disable];

}

export default useHandleFormAddClient;