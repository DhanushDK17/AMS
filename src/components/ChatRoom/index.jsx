import {Link} from 'react-router-dom';
import { ChatInput } from '../ChatInput';
import { useAuth } from '../../hooks/useAuth';
import { fetchMessages } from '../../services/firebase';
import React from 'react';
import { Message } from '../Message';
function ChatRoom () {
    const {user} = useAuth();
    const [messages, setMessages] = React.useState([]);
    const messageContainer = React.useRef(null);
    React.useEffect(() => {
        fetchMessages(user.apartmentId, setMessages);
    }, [setMessages, user.apartmentId]);
    React.useLayoutEffect(() => {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    })
    return (
        <div style={{padding: '20px', border: '1px solid gray', width: '500px', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Link to="/">Back</Link>
            <h2>{user.apartmentId}</h2>
            </span>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                <div  ref={messageContainer} id='message-container' style={{display: 'flex', flexDirection: 'column', width: '100%', height: '400px', padding: '10px', overflow: 'scroll'}}>
                    {
                    messages.map((message) => 
                        <Message key={message.id} message={message}/>
                    )
                    }
                </div>
                
                <ChatInput />
            </div>
        </div>            
    )
}

export { ChatRoom };