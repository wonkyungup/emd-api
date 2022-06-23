export const isInvalid  = (value)  => {
    return value === undefined || value === null
}

export const isValid = (value) => {
    return !isInvalid(value)
}