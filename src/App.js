import React, { useEffect, useState } from 'react';
import './app.css'; // Ensure your CSS is imported
import ContactPage from './Components/ContactPage';
import logo from './logo.png'
function App() {
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOutText, setFadeOutText] = useState(false); // New state for fading out text

  useEffect(() => {
    // Show logo first
    const timer1 = setTimeout(() => {
      setShowText(true); // Show "Delivering Demands" text after logo animation completes
    }, 2800); // Adjust this based on your logo animation duration

    // Fade out "Delivering Demands" text after it has been visible for 2 seconds
    const timer2 = setTimeout(() => {
      setFadeOutText(true); // Start fading out the text after it has been visible
    }, 4800); // Keep it on screen for 2 seconds
    
    // Show main content after "Delivering Demands" text fades out completely
    const timer3 = setTimeout(() => {
      setShowContent(true); // Show content after text fades out completely
    }, 4900); // Adjust based on timing

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="App">
      <div className="intro-page">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {showText && (
        <div
          className={`fade-in-text ${fadeOutText ? 'fade-out' : ''}`} // Apply fade-out class if necessary
          style={{ animation: fadeOutText ? 'textFadeOut 1.5s forwards' : '' }}
        >
          "Delivering Demands"
        </div>
      )}

      {showContent && (
        <div className="content" style={{ animation: 'showContent 1.5s ease-in forwards' }}>
          <ContactPage></ContactPage>
        </div>
      )}
    </div>
  );
}

export default App;
