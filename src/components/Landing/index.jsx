import {Link} from 'react-router-dom';
import './styles.css';
import { Fab } from '@mui/material';

function Landing() {
    return (
        <>
        <h2>
            Sample apartment portal
        </h2>
        <ul className="chat-room-list">
            <li>
                <Link to={`/chat`}>Chat</Link>
            </li>
            <li>
                <Link to={`/event`}>Host</Link>
            </li>
        </ul>
        <Fab style={{position:'absolute', bottom: '30px', right: '30px'}} variant='extended'>Chat</Fab>
        </>
    )
}
export { Landing };