import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { CustomProvider } from './theme';
import { Navbar } from './components/Navbar';
import { Repos } from './components/Repos';
import { Home } from './components/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginCallback } from './components/LoginCallback';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomProvider>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login/callback" component={LoginCallback} />
            <ProtectedRoute path="/repos" component={Repos} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </CustomProvider>
    </BrowserRouter>
  );
};

export default App;
