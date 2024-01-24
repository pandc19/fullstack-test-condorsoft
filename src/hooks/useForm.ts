import { type ChangeEvent, useEffect, useMemo, useState } from 'react';

type FormValidations<T> = {
    [K in keyof T]: [(value: T[K]) => boolean, string];
};

export const useForm = <T extends Record<string, any>>(initialForm: T, formValidations?: FormValidations<T>) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {

        for (const formValue of Object.values(formValidation)) {
            if (formValue !== null) return false;
        }

        return true;
    }, [formValidation])


    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues: Record<string, string | null> = {};

        for (const formField of Object.keys(formValidations ?? {}) as Array<keyof T>) {
            const validation = formValidations?.[formField];

            if (validation) {
                const [fn, errorMessage] = validation;

                const fieldValue: T[keyof T] = formState[formField] as T[keyof T];

                formCheckedValues[`${String(formField)}Valid`] = fn(fieldValue) ? null : errorMessage;
            }
        }

        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}