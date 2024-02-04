import { Routes, Route } from 'react-router-dom';
import { Land } from '../Land';

function AuthenticatedApp () {
    return (
        <Routes>
            <Route path='/*' element={<Land/>} />
        </Routes>
    );
};

export { AuthenticatedApp };