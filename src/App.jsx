import { useState } from 'react';
import './App.css';

const PasswordGenerator = () => {
  const [rangeValue, setRangeValue] = useState(10); // Default value for password length
  const [password, setPassword] = useState('');
  const [upperChecked, setUpperChecked] = useState(false);
  const [lowerChecked, setLowerChecked] = useState(false);
  const [numberChecked, setNumberChecked] = useState(false);
  const [symbolChecked, setSymbolChecked] = useState(false);
  const [copyFeedbackVisible, setCopyFeedbackVisible] = useState(false);

  const upperStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerStr = "abcdefghijklmnopqrstuvwxyz";
  const numBer = '0123456789';
  const symBol = '@$-_%&!?#*';

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleGeneratePassword = () => {
    const count = parseInt(rangeValue);
    let passwordStr = '';

    if (upperChecked) {
      passwordStr += upperStr;
    }
    if (lowerChecked) {
      passwordStr += lowerStr;
    }
    if (numberChecked) {
      passwordStr += numBer;
    }
    if (symbolChecked) {
      passwordStr += symBol;
    }

    if (passwordStr.length === 0) {
      alert('Please select at least one option');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * passwordStr.length);
      generatedPassword += passwordStr[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyFeedbackVisible(true);
    setTimeout(() => {
      setCopyFeedbackVisible(false);
    }, 2000);
  };

  return (
    <div className="password-generator">
      <div className="password-options">
        <h1>Password Generator</h1>
        
        <div className="slider">
          <label>Length: </label>
          <input
            type="range"
            min="1"
            max="20"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          <span>{rangeValue}</span>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={upperChecked}
              onChange={() => setUpperChecked(!upperChecked)}
            />
            Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={lowerChecked}
              onChange={() => setLowerChecked(!lowerChecked)}
            />
            Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={numberChecked}
              onChange={() => setNumberChecked(!numberChecked)}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={symbolChecked}
              onChange={() => setSymbolChecked(!symbolChecked)}
            />
            Symbols
          </label>
        </div>

        <div>
          <button onClick={handleGeneratePassword}>
            Generate Password
          </button>
        </div>
      </div>

      <div className="password-display">
        <textarea
          value={password}
          readOnly
        ></textarea>

        <button id="copyButton" onClick={handleCopy}>
          Copy
        </button>

        <div
          id="copyFeedback"
          className={copyFeedbackVisible ? 'visible' : ''}
        >
          Password copied to clipboard!
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
