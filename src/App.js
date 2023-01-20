import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState(null);

  return (
      <div className="App">
        <Header />
        <Nav 
          user={user}
          setUser={setUser}
        />
        <Main 
          user={user}
          setUser={setUser}
        />
      </div>
  );
}

export default App;
