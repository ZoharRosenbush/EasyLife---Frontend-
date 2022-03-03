import { useState } from 'react'

export const useFormRegister = (initialState) => {

    const [fields, setFields] = useState(initialState)

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    const register = (field, type = 'text') => {
        return {
            type,
            name: field,
            value: fields[field],
            onChange: handleChange,
            className: 'primary-input'
        }
    }
    
    return [
        register,
        fields
    ]
}