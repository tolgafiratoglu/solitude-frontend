import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Broker from './component/Broker'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" name="login" element={ <Login/> } />
          <Route path="/dashboard" name="dashboard" element={ <Dashboard/> } />
          <Route path="/broker/:brokerid/topics" name="broker.topics" element={ <Broker/> } />
        </Routes>
      </BrowserRouter>    
    </div> 
  );
}

export default App;