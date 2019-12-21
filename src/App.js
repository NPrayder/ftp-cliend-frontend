import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Connections from './components/Connections';
import ServerContent from './components/ServerContent';

const App = () => {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Switch>
          <Route path='/connect'>
            <AuthComponent />
          </Route>
          <Route path='/my-connections'>
            <Connections />
          </Route>
          <Route path="/">
            <ServerContent />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;