import React, { useState, useEffect, act } from 'react';
import './App.css';

// import assets
import meowSound from "./assets/meow.mp3";



function App() {

  // set up background themes as an array 
  const themes = [
    {
      name: "blue",
      background: require("./assets/background-blue.png"),
      timerColour: '#FFFFFF',
      encouragementColour: '#A3E8FD',
      study: require("./assets/study-blue.png"),
      studyClicked: require("./assets/study-clicked-blue.png"),
      break: require("./assets/break-blue.png"),
      breakClicked: require("./assets/break-clicked-blue.png"),
      play: require("./assets/play-blue.png"),
      reset: require("./assets/reset-blue.png"),
      close: require("./assets/close-blue.png")

    },
    {
      name: "green",
      background: require("./assets/background-green.png"),
      timerColour: '#7BBBA0',
      encouragementColour: '#30897C',
      study: require("./assets/study-green.png"),
      studyClicked: require("./assets/study-clicked-green.png"),
      break: require("./assets/break-green.png"),
      breakClicked: require("./assets/break-clicked-green.png"),
      play: require("./assets/play-green.png"),
      reset: require("./assets/reset-green.png"),
      close: require("./assets/close-green.png")

    },
    {
      name: "mauve",
      background: require("./assets/background-mauve.png"),
      timerColour: '#DF8DA4',
      encouragementColour: '#C17C9E',
      study: require("./assets/study-mauve.png"),
      studyClicked: require("./assets/study-clicked-mauve.png"),
      break: require("./assets/break-mauve.png"),
      breakClicked: require("./assets/break-clicked-mauve.png"),
      play: require("./assets/play-mauve.png"),
      reset: require("./assets/reset-mauve.png"),
      close: require("./assets/close-mauve.png")

    },
    {
      name: "purple",
      background: require("./assets/background-purple.png"),
      timerColour: '#90519A',
      encouragementColour: '#FFFFFF',
      study: require("./assets/study-purple.png"),
      studyClicked: require("./assets/study-clicked-purple.png"),
      break: require("./assets/break-purple.png"),
      breakClicked: require("./assets/break-clicked-purple.png"),
      play: require("./assets/play-purple.png"),
      reset: require("./assets/reset-purple.png"),
      close: require("./assets/close-purple.png")

    },
    {
      name: "turquoise",
      background: require("./assets/background-turquoise.png"),
      timerColour: '#2999BC',
      encouragementColour: '#3EBDC8',
      study: require("./assets/study-turquoise.png"),
      studyClicked: require("./assets/study-clicked-turquoise.png"),
      break: require("./assets/break-turquoise.png"),
      breakClicked: require("./assets/break-clicked-turquoise.png"),
      play: require("./assets/play-turquoise.png"),
      reset: require("./assets/reset-turquoise.png"),
      close: require("./assets/close-turquoise.png")

    },
  ]

  // timer functionality
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  // want it make encouragement message to be empty initallly
  const [encouragement, setEncouragement] = useState(""); 
  const meowAudio = new Audio(meowSound);
  const [themeIndex, setThemeIndex] = useState(0);
  const activeTheme = themes[themeIndex];

  const cheerMessages = [
    "You Can Do It!",
    "I Believe In You!",
    "You Got This!", 
    "Stay Locked In!",
    "Keep Up The Grind!",
    "Stay Focused",
    "Never Back Down!",
    "Never Give Up!",
    "Academic Weapon!"
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
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Change the background theme every 5 mins during study mode
          if (!isBreak) {
            const totalElapsed = (25 * 60) - newTime;

            if (totalElapsed % 300 === 0) {
              setThemeIndex(prevIndex => (prevIndex + 1) % themes.length);
            } 
          }
          return newTime;
        }); 
        
      }, 1000); // 1000 millisecs = 1 sec
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // set initial switch mode to false
  useEffect(() => {
    switchMode(false);
  }, []);

  // meow sound played when timer is up 
  useEffect(() => {
    if (timeLeft == 0 && isRunning) {
      meowAudio.play().catch(err => {
        console.error("Audio play failed:", err);
      });

      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }, [timeLeft]);

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

  // handle close click behaviour
  const handleCloseClick = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      console.warn("Electron API not available");
    }
  }

  return (
  
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${activeTheme.background})`,
      }}
    >
      <button className="close-button">
        <img src={activeTheme.close} onClick={ handleCloseClick } />
      </button>

      <h1 className="timer-asset">{formatTime(timeLeft)}</h1>

      <h1
        className="timer-asset"
        style={{ color: activeTheme.timerColour }}
      >
        {formatTime(timeLeft)}
      </h1>

      <p 
        className={`encouragement-asset ${!isRunning ? "hidden" : ""}`}
        style={{ color: activeTheme.encouragementColour}}  
      >
        {encouragement}
      </p>

      <button className="play-asset" onClick={handleClick}>
        <img 
          src={isRunning ? activeTheme.reset : activeTheme.play}
          alt="Button Icon"
        />
      </button>

      <div className="mode-buttons">
        <button className="image-button" onClick={() => switchMode(false)}>
          <img 
            src={isBreak ? activeTheme.study : activeTheme.studyClicked}
            alt="Study"
          />
        </button>

        <button className="image-button" onClick={() => switchMode(true)}>
          <img 
            src={isBreak ? activeTheme.breakClicked : activeTheme.break}
            alt="Break"
          />
        </button>
      </div>
    </div>

  );
}

export default App;
