import React from 'react';
import s from './FormsControls.module.css'
import { FormHelperText, TextField } from '@material-ui/core';

export const InputArea = ({ input, meta, value, autoFocus, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <span className={s.formControl + " " + (hasError ? s.error : "")}>
            <input {...input} {...props} autoFocus={autoFocus} />
            {hasError && <span >{meta.error}</span>}
        </span>
    )
}

export const InputAreaMaterial = ({ label, input, meta: { touched, invalid, error }, ...custorm }) => {
    const hasError = touched && error;
    return (
        <>
            <TextField
                autocomplete="off"
                margin="normal"
                fullWidth
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && invalid}
                {...input}
                {...custorm}
            />
            {hasError &&
                <FormHelperText>{error}</FormHelperText>
            }
        </>
    )
}

export const InputAreaOutlined = ({ label, input, meta: { touched, invalid, error }, ...custorm }) => {
    const hasError = touched && error;
    return (
        <>
            <TextField
                size="small"
                variant="outlined"
                autocomplete="off"
                margin="normal"
                fullWidth
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && invalid}
                {...input}
                {...custorm}
            />
            {hasError &&
                <FormHelperText>{error}</FormHelperText>
            }
        </>
    )
}