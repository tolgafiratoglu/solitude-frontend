import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './component/Login'
import Logout from './component/Logout'
import Dashboard from './component/Dashboard'
import ClusterBrokers from './component/ClusterBrokers'
import ClusterTopics from './component/ClusterTopics'
import ClusterTopicCreate from './component/ClusterTopicCreate';
import TopicPartitionIncrease from './component/TopicPartitionIncrease'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" name="login" element={ <Login/> } />
          <Route exact path="/logout" name="logout" element={ <Logout/> } />
          <Route exact path="/dashboard" name="dashboard" element={ <Dashboard/> } />
          <Route exact path="/cluster/:clusterid/brokers" name="cluster.brokers" element={ <ClusterBrokers/> } />
          <Route exact path="/cluster/:clusterid/topics" name="cluster.topics" element={ <ClusterTopics/> } />
          <Route exact path="/cluster/:clusterid/topic/create" name="cluster.topic.create" element={ <ClusterTopicCreate/> } />
          <Route exact path="/cluster/:clusterid/:topic/add-partition" name="cluster.topic.partition" element={ <TopicPartitionIncrease/> } />
        </Routes>
      </BrowserRouter>    
    </div> 
  );
}

export default App;