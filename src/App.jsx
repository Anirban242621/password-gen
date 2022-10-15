import "./Styles.scss";
import React, { useState, useRef, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import people from "../src/assets/people.svg";
import {
  number,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Characters";
import { ALERT, COPY_SUCCESS } from "./Message";
toast.configure();
function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [uppercase, setUpperCase] = useState(true);
  const [lowercase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const copyBtn = useRef();
  const handleGeneratorPassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      notifs(ALERT, true);
    }
    let characterList = "";
    if (uppercase) {
      characterList += upperCaseLetters;
    }
    if (lowercase) {
      characterList += lowerCaseLetters;
    }
    if (numbers) {
      characterList += number;
    }
    if (symbols) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  };
  useEffect(() => {
    handleGeneratorPassword();
  }, []);

  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = generateRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const generateRandomIndex = (limit) => {
    return Math.floor(Math.random() * limit);
  };

  const copyFormClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  const notifs = (message, Error = false) => {
    if (Error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCopy = () => {
    copyFormClipboard();
    notifs(COPY_SUCCESS);
  };

  return (
    <>
      <div className="container" style={{ minHeight: "100% !important " }}>
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>

          <div className="generator_password">
            {password}
            <button
              className="generator_passwordGenerateBtn"
              ref={copyBtn}
              onClick={handleCopy}
            >
              <FaClipboard />
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-length">Password Length</label>
            <input
              name="password-length"
              id="password-length"
              type="number"
              max="20"
              min="7"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Include Uppercase</label>
            <input
              name="uppercase-letters"
              id="uppercase-letters"
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Include Lowercase</label>
            <input
              name="lowercase-letters"
              id="lowercase-letters"
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Number</label>
            <input
              name="include-numbers"
              id="include-numbers"
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              name="include-symbols"
              id="include-symbols"
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
          </div>
          <button className="generator_btn" onClick={handleGeneratorPassword}>
            Generate New Password
          </button>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          position: "unset",
          paddingTop: "70px",
          fontSize: "19px",
        }}
      >
        <span style={{ color:"#DEBAD6" }}>Design and developed by 💜</span>
        
        {/* <img src={people} alt="people" style={{ width:"20px" }}/> */}
        <hr width="250px" style={{ margin:"auto" }}/>
        <b>
          <a
            href="https://anirban-majumdar-97.vercel.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3CACAE",textDecoration:"none" }}
          >
            Anirban K Majumdar
          </a>
        </b>
      </div>
    </>
  );
}

export default App;
