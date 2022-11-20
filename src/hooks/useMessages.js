import React from 'react';
import { fetchMessages } from '../services/firebase';

function useMessages(roomId) {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = fetchMessages(roomId, setMessages);
        return unsubscribe;
    }, [roomId]);

    return messages;
}

export { useMessages };