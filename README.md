# ☁️ Tiny Thrive 

>Tiny Thrive is a pixel-styled desktop focus timer built with **React** and **Electron**.  
It’s designed to sit quietly on your desktop and help you stay focused during study sessions, with gentle encouragement, timed breaks, and rotating color themes to keep things feeling fresh.
Currently, I've been working on packaging the Electron app for desktop installation.
---

## ✨ Features

- Pomodoro-style timer  
  - 25-minute study sessions  
  - 5-minute breaks
- Pixel art UI with pixelated rendering
- Dynamic theme rotation during study mode
- Encouragement messages that change over time
- Sound notification when a session ends
- Custom frameless Electron window
  - Custom close and minimise buttons
- Lightweight desktop app experience

## 🛠 Tech Stack

- React
- Electron
- TypeScript
- CSS
- IPC (Electron inter-process communication)


## 🖥️ Getting Started

### Install dependencies
```bash
npm install
```
### Run React in development mode 
```bash
npm run start
```
opens the app at http://localhost:3000

### Build the React app
```bash
npm run build
```
### Run the Electron app
```bash
npm run electron
```

## 🧠 How It Works 
- Timer logic is handled in React using hooks
- Themes rotate automatically every 5 minutes during study mode
- The Electron window is frameless, so window controls are recreated in the UI
- Close and minimise buttons communicate with Electron using IPC via a secure preload script

## 👩‍💻 Currently Working on 
- Pause / Resume indicator
- Theme selector
- Session statistics

## 🗂️ Simplified Project Structure 
```bash
/src
  ├─ App.tsx
  ├─ App.css
  ├─ global.d.ts
  └─ assets/

/public
  ├─ electron.js
  ├─ package.json
  └─ preload.js
```
