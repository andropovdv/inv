import React from 'react';
import s from './FormsControls.module.css'

export const InputArea = ({ input, meta, value, autoFocus, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <span className={s.formControl + " " + (hasError ? s.error : "")}>
                <input {...input} {...props} autoFocus={autoFocus} />
            {hasError && <span >{meta.error}</span>}
        </span>
    )
}