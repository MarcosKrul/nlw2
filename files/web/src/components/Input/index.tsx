import React from 'react';
import { InputHTMLAttributes } from 'react';

import './styles.css'

/* A interface herda os atributos presentes na tag input
   O usuario pode passar outros atributos para o componente Input */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input:React.FunctionComponent<InputProps> = ({name, label, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={ name }> { label } </label>
            <input type="text" id={ name } {...rest}/>
        </div>
    );
}

export default Input;