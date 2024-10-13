import React, { useEffect, useState } from 'react';
import './app.css'; // Ensure your CSS is imported
import ContactPage from './Components/ContactPage';
import logo from './logo.png'
function App() {
  const [showContent, setShowContent] = useState(false);


  useEffect(() => {
    // Show logo first
    const timer1 = setTimeout(() => {
    }, 2800); // Adjust this based on your logo animation duration

    // Fade out "Delivering Demands" text after it has been visible for 2 seconds

    // Show main content after "Delivering Demands" text fades out completely
    const timer3 = setTimeout(() => {
      setShowContent(true); // Show content after text fades out completely
    }, 3000); // Adjust based on timing

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="App">
      <div className="intro-page">
        <img src={logo} alt="Logo" className="logo" />
      </div>



      {showContent && (
        <div className="content" style={{ animation: 'showContent 1.5s ease-in forwards' }}>
          <ContactPage></ContactPage>
        </div>
      )}

    </div>
  );
}

export default App;
