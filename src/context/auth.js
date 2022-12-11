import React from 'react';
import { loginWithGoogle } from '../services/firebase';
import { getAnalytics, logEvent } from "firebase/analytics";

const AuthContext = React.createContext();
const analytics = getAnalytics();

const AuthProvider = (props) => {
    // const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('owner');
    const viewSetter = (view) => {
        setCurrentView(view)
    };
    const login = async (type) => {
        if (!user) {
            const user = await loginWithGoogle();
            if (!user) {
                console.log('login failed');
            }
            setUser({
                ...user,
                type: type
            });
            logEvent(analytics, `login`, {
                method: 'google',
                user: user.email
            });
        }
        setCurrentView(type);
    };

    const value = {user, login, currentView, viewSetter};
    return <AuthContext.Provider value={value} {...props} />;

}

export { AuthContext, AuthProvider};