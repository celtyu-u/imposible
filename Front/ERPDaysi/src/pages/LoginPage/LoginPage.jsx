import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';  
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css';

const LoginPage = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const navigate=useNavigate();
    const onSubmit = () => {
        setSubmitted(true);
        if (usuario && contraseña) {
            // Aquí iría la lógica para enviar los datos del formulario al backend.
            console.log('Usuario:', usuario);
            console.log('Contraseña:', contraseña);
        }
        navigate('/main');
    };

    const isFormFieldInvalid = (fieldName) => !!(submitted && ![usuario, contraseña][fieldName.toLowerCase().indexOf('usuario')]);


    return (
        <div className="login-page">
            <Card className="login-card">
                <div className="login-header">
                    <div>
                    <i className="pi pi-database big-pi"></i>
                    </div>
                    <p className='login-title'>ERP Daysi</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <InputText
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                placeholder="Usuario"
                                className={classNames({ 'p-invalid': isFormFieldInvalid('usuario') })}
                            />
                            {isFormFieldInvalid('usuario') && <small className="p-error">Usuario es requerido.</small>}
                        </div>
                        <div className="p-field p-col-12">
                            <InputText
                                id="contraseña"
                                type="password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                placeholder="Contraseña"
                                className={classNames({ 'p-invalid': isFormFieldInvalid('contraseña') })}
                            />
                            {isFormFieldInvalid('contraseña') && <small className="p-error">Contraseña es requerida.</small>}
                        </div>
                    </div>

                    <Button label="Iniciar Sesión" type="submit" onClick={onSubmit} className="button-primary2" />
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;