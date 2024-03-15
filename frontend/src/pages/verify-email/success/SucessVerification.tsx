import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";


const SuccessVerification = () => {

    const [secondsForRedirect, setSecondsForRedirect] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsForRedirect(secondsForRedirect - 1);
        }, 1000);
        if (secondsForRedirect === 0) {
            clearInterval(interval);
            window.location.href = "https://deli.com.br/pt-br/";
        }
        return () => clearInterval(interval);
    }, [secondsForRedirect]);

    const {user} = useUser();

    if (!user) {
        return <Navigate to="/signup" />
    }

    const {username} = user;

    return (
        <article className="card">
            <img src="/verified-symbol-icon.svg" alt="Verified Icon" />
            <h2>¡Bienvenido a la comunidad {username}!</h2>
            <h3>¡Tu cuenta ha sido verificada exitosamente!</h3>
            <p>¡Ahora puedes disfrutar de <span>Deli</span>!</p>
            <p>Seras redirigido a la página de inicio en <span className="seconds">{secondsForRedirect}</span> segundos.</p>
            <p>Si no eres redirigido automáticamente, haz clic <a href={"https://deli.com.br/pt-br/"}>aquí</a>.</p>
        </article>
    )
}

export default SuccessVerification