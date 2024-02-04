import './styles.css'
import { useAuth } from '../../hooks/useAuth';
function UnauthenticatedApp() {
    const {login} = useAuth();
    return (
        <>
            <div>
                <button onClick={login} className="login">Login with Google</button>
            </div>
        </>
    )
}

export { UnauthenticatedApp };