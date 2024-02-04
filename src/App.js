import './App.css';

import { Login } from './components/Login';
import { useAuth } from './hooks/useAuth';
import { Owner} from './components/Owner';
import { Land} from './components/Land';

function App() {
  const {user, currentView} = useAuth();
  return(<>
    {
      (!user || currentView === 'login') ? <Login/> : currentView === 'resident' ? <Land/> : <Owner/>
    }
    </>);
}

export default App;
