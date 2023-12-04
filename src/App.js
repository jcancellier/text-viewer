import './App.css';
import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormatClick = () => {
    const formatted = inputText.replace(/&lrm;|<[^>]*>/g, '');
    setFormattedText(formatted);
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
