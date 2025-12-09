import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // timer functionality
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState(""); // want it to be empty initallly

  const cheerMessages = [
    "You Can Do It!",
    "I Believe In You!",
    "You Got This!", 
    "Stay Locked In!",
    "Keep Up The Grind!",
    "Stay Focused Academic Weapon"
  ];

  const breakMessages = [
    "Stay Hydrated!",
    "Snacks, Maybe?",
    "Take A Breather!",
    "I Love You <3",
    "Stretch Your Legs!"
  ];
  // Encouragement message updater
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);

      let index = 1;

      // change message every 1 min
      messageInterval = setInterval( () => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 60000); // 60000 millisec = 1 min
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  // Countdown Timer
  useEffect( () => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval( () => {
        setTimeLeft(prev => prev - 1);
      }, 1000); // 1000 millisecs = 1 sec
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  //format the time
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // handle study and break modes 
  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60: 25 * 60);
  }

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      //  timer is running
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60: 25 * 60);
    }
  }

  return (
    <div style = {{position: 'relative'}}>

    <div>
      <button className="closeButton">
        Close
      </button>
    </div>

    <div className="home-content">
      <div className="home-controls">
        <button className="image-button" onClick={ () => switchMode(false)}>
          Thrive
        </button>
        <button className="image-button" onClick={ () => switchMode(true)}>
          Break  
        </button>
      </div>

      {/* motivational speech here */}
      <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
        { encouragement}
      </p>

      <h1 className="home-timer">{formatTime(timeLeft)}</h1>

      <button className="home-button" onClick={handleClick}>
        Start
      </button>
    </div>
    </div>
  );
}

export default App;
