import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { Event } from '../Event';
import { ChatRoom } from '../ChatRoom';

function AuthenticatedApp () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/event' element={<Event/>} />
            <Route path='/chat' element={<ChatRoom/>}/>
        </Routes>
        </BrowserRouter>
    );
};

export { AuthenticatedApp };