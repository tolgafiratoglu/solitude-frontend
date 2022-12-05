import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './component/Login'
import Dashboard from './component/Dashboard'
import ClusterBrokers from './component/ClusterBrokers'
import ClusterTopics from './component/ClusterTopics'
import ClusterTopicCreate from './component/ClusterTopicCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" name="login" element={ <Login/> } />
          <Route exact path="/dashboard" name="dashboard" element={ <Dashboard/> } />
          <Route exact path="/cluster/:clusterid/brokers" name="cluster.brokers" element={ <ClusterBrokers/> } />
          <Route exact path="/cluster/:clusterid/topics" name="cluster.topics" element={ <ClusterTopics/> } />
          <Route exact path="/cluster/:clusterid/topic/create" name="cluster.topic.create" element={ <ClusterTopicCreate/> } />
        </Routes>
      </BrowserRouter>    
    </div> 
  );
}

export default App;