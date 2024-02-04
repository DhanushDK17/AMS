import { Switch } from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login () {
    const {login} = useAuth();
    const [type, setType] = useState('owner');
    const onTypeChangeHandler = () => {
        if (type === 'resident') {
            setType('owner');
        } else {
            setType('resident');
        }
    };
    const handleLogin = () => {
        login(type).then(() => {
        });
    }
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <div style={{marginBottom: '50px',fontSize: '40px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                APARTMENT LIFE
            </div>
            <div style={{marginBottom: '50px'}}>    
                Looking for apartments?
                <Switch color='warning' defaultChecked onChange={onTypeChangeHandler}/>
                Apartment owner
            </div>
            <div>
                <button onClick={handleLogin} className="login">Login with Google</button>
            </div>
        </div>
        </>
    );
}

export { Login }