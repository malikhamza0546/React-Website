import React from 'react'
import { ErrorMessage, useField } from 'formik'

const TextField = ({ ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div>
            <input
                className={`block border border-grey-light w-full p-3 rounded mb-4 ${meta.touched && meta.error && 'is-invalid'}`}
                {...field}
                {...props}
                autoComplete="off"
            />
            <ErrorMessage name={field.name} />
        </div>
    )
}

export default TextField
