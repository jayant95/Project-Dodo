import React from 'react';

const Input = (props) => {
    return (
        <div className="form-group">
            <input 
                className="form-input"
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;