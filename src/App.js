import React from 'react';
import AuthProvider from './components/store/auth/provider';
import Routes from './routes';
import './styles/global.css';

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
