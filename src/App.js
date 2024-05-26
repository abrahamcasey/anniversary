import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    if (!isFlipped) {
      const audio = document.getElementById('audio');
      if (audio) {
        audio.play();
      }
      createFloatingEmojis();
    }
  };

  const createFloatingEmojis = () => {
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container';
    document.body.appendChild(emojiContainer);
  
    const emojis = ['💐', '❤️', '💐', '❤️', '💐', '❤️', '💐', '❤️', '💐', '❤️', '💐', '❤️'];
  
    emojis.forEach((emoji, index) => {
      const emojiElement = document.createElement('div');
      emojiElement.className = 'floating-emoji';
      emojiElement.textContent = emoji;
      emojiElement.style.animationDelay = `${index * 0.5}s`;
  
      // Randomize starting position within the viewport
      const randomX = Math.floor(Math.random() * (window.innerWidth - 30));
      const randomY = Math.floor(Math.random() * (window.innerHeight - 30));
      emojiElement.style.left = `${randomX}px`;
      emojiElement.style.top = `${randomY}px`;
  
      emojiContainer.appendChild(emojiElement);
    });
  
    setTimeout(() => {
      emojiContainer.remove();
    }, 5000);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <audio id="audio" src="/anniversary.mpeg"></audio>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="front">
          <h1>Happy Anniversary!</h1>
          <div className="hearts">
            <div className="heart">❤️</div>
            <div className="heart">❤️</div>
            <div className="heart">❤️</div>
          </div>
        </div>
        <div className="back">
          <p>Wishing you a day filled with love and joy!</p>
          
          <div className="heartt">❤️</div>
        </div>
      </div>
    </div>
  );
};

export default App;
