import React from 'react';
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.css'

/* Definicao das propriedades do componente 
   title:string -> o componente deve, obrigatoriamente,
   receber uma string
   title?:string -> o componente pode, ou nao, receber
   uma string */
interface PageHeaderProps {
    title: string; 
    description?: string;
}

/* React.FunctionComponente ou React.FC
   Componente react como uma funcao 
   Pode existir um componente na forma de classe 
   <> generics, em typescript; ideia de parametros */
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>
            <div className="header-content">
                <strong>    
                    { props.title }
                </strong>
                { props.description && <p>{props.description}</p>}
                { props.children };
            </div>
        </header>
    );
}

export default PageHeader;