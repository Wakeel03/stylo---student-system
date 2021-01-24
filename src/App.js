import './App.css';
import Home from './components/Home';
import ChapterPage from './components/ChapterPage';
import SideBar from './components/SideBar';
import ChapterDetailPage from './components/ChapterDetailPage'

import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

function App() {

  

  return (
    <Router>
    <div className="App">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="center-section">
        <Switch>
          <Route path="/" exact component={ Home }/>
          <Route path="/module/:id" component={ ChapterPage }/>
        </Switch> 
      </div>

    </div>
    </Router>
    
  );
}

export default App;
