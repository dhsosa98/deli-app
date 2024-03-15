import { Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser"


const VerifyEmail = () => {
    const { user } = useUser();

    if (!user || user?.isVerified) {
        return (<Navigate to="/signup" />)
    }

    const { email } = user;

    return (
        <article className="card">
            <img src="https://deli.com.br/assets/img/icons/deli_waiters-app-3cec8aec.svg" alt="Deli" />
            <h2>Por favor verifica tu correo electrónico</h2>
            <h3>¡Estas a un paso de completar tu registro!</h3>
            <p>Te hemos enviado un correo electrónico a <span className="email">{email}</span> con un enlace para verificar tu cuenta.</p>
            <p>Haz clic en el enlace que te hemos enviado y podrás comenzar a disfrutar de <span>Deli</span>.</p>
        </article>
    )
}

export default VerifyEmail