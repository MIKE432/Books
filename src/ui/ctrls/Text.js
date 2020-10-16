import React, { useState } from 'react'


export const Text = (props) => {
    
    const { className, name, placeholder, value, onChange, isErrorConditionBlock, errorMsg } = props
    const [isError, setError] = useState(false);
    
    return (
    <div className="text-container">
        <input
            className={className}
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                onChange(e)
                setError(isErrorConditionBlock(e.target.value))

            }}
        />

    </div>

    )
}

const Error = ({ isVisible, msg }) => (
    <div className="error-msg-container">
        {
            isVisible && <p>{msg}</p>
        }
    </div>
)