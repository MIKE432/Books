import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ui/styles/StylesToExport.scss'
import RouterComponent from './core/routes/router'
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
      <RouterComponent/>
  );
}

export default App;
