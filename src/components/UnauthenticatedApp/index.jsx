import './styles.css'
import { useAuth } from '../../hooks/useAuth';

function UnauthenticatedApp() {
    const {login} = useAuth();
    return (
        <>
            <h2>
                Login to view your resident portal
            </h2>
            <div>
                <button onClick={login} className="login">Login with Google</button>
            </div>
        </>
    )
    // return <div>I'm unauthenticated!</div>
}

export { UnauthenticatedApp };