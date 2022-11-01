import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { ApplicationViews } from './components/ApplicationViews';
import Header from "./components/Header";
import { onLoginStatusChange } from "./modules/authManager";
import { getCurrentUserByFirebaseId } from './modules/UserProfileManager';
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUserByFirebaseId().then(setIsUser)
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} isUser={isUser} />
      <ApplicationViews isLoggedIn={isLoggedIn} isUser={isUser} />
    </Router>
  );
}

export default App;

