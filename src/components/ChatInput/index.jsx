import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { sendMessage } from '../../services/firebase';
import './styles.css';
function ChatInput () {
    const { user } = useAuth();
    const [message, setMessage] = React.useState('');
    const handleChange = (event) => {
        setMessage(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(user, message)
        setMessage('');
    }
    return (
        <form onSubmit={handleSubmit} className="chat-input-container" style={{color: 'black'}}>
            <input type="text"
            placeholder="Enter your message"
            value={message}
            onChange={handleChange}
            className = "chat-input"
            required
            minLength={1}/>
            <button style={{marginLeft: '10px'}} type='submit' disabled={message < 1} className="chat-submit-button">Send</button>
        </form>
    )
}

export {ChatInput};