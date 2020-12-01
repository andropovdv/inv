export const required = (value) => {
    if (value) return undefined;
    return 'Обязтельно к заполнению';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Максимальная длинна ${maxLength} символов`;
}

export const email = (value) => {
    if (value && !/^(?!.*\.{2})(?!\.)[a-z0-9_.'-]*[a-z0-9_'-]@(?!_)(?:[a-z0-9_'-]+\.)+[a-z0-9_'-]{2,}$/i.test(value)) {
        return 'Invalid email address'
    };
    return undefined;
}

    // value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    //     'Invalid email address' : undefined