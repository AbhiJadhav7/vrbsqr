import React from 'react';
import ContactPage from './Components/ContactPage';
import Navbar from './Components/Navbar';
import './app.css'
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <ContactPage />
    </div>
  );
}

export default App;
