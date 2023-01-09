import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import "./app.css"

function App() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  
  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  
  return (
    <div className='emoji_container'>
      <h3> Emoji Picker</h3>
      {chosenEmoji ? (
        <span>Your Emoji: {chosenEmoji.emoji}</span>
      ) : (
        <span>No Emoji</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
   
}

export default App;
