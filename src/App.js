import './App.css';
import { useState, useEffect } from 'react';

const FORMATTED_TEXT_KEY = 'formattedText';
const SCROLL_POSITION_KEY = 'scrollPosition';

function App() {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const storedFormattedText = localStorage.getItem(FORMATTED_TEXT_KEY);
    const storedScrollPosition = localStorage.getItem(SCROLL_POSITION_KEY);

    if (storedFormattedText) {
      setFormattedText(storedFormattedText);
    }

    if (storedScrollPosition) {
      const parsedScrollPosition = parseInt(storedScrollPosition, 10)
      setScrollPosition(parsedScrollPosition);
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // On component mount, if scroll position was set then scroll to position.
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition])

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormatClick = () => {
    const formatted = inputText.replace(/&lrm;|<[^>]*>/g, '');
    setFormattedText(formatted);
    localStorage.setItem(FORMATTED_TEXT_KEY, formatted);
  };

  const handleBeforeUnload = () => {
    localStorage.setItem(SCROLL_POSITION_KEY, window.scrollY);
  };

  return (
    <div className="App">
      <header className="App-header">
      <label>
        Input Text:
        <textarea value={inputText} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleFormatClick}>Format Text</button>
      <br />
      <h2>Formatted Text</h2>
      <div style={{ whiteSpace: 'pre-line' }}>{formattedText}</div></header>
    </div>
  );
}

export default App;
