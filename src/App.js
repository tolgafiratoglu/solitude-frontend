import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './component/Login'
import Dashboard from './component/Dashboard'
import ClusterTopics from './component/ClusterTopics'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" name="login" element={ <Login/> } />
          <Route exact path="/dashboard" name="dashboard" element={ <Dashboard/> } />
          <Route exact path="/cluster/:clusterid/topics" name="cluster.topics" element={ <ClusterTopics/> } />
        </Routes>
      </BrowserRouter>    
    </div> 
  );
}

export default App;