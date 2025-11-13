
import type{JSX} from 'react';

const RegisterForm = (): JSX.Element => {
    return (
        <form>
            <label htmlFor="nombreCompleto">Nombre Completo</label>
            <input type="text" id="nombreCompleto" name="nombreCompleto" required />

            <label htmlFor="correoElectronico">Correo electrónico laboral</label>
            <input type="email" id="correoElectronico" name="correoElectronico" required />

            <button>Crear cuenta</button>
        </form>
        
    );
}   

export default RegisterForm;