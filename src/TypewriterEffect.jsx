import { useEffect, useState, useRef } from "react";

const TypewriterEffect = () => {
  const [sentenceState, setSentenceState] = useState("");
  const intervalId = useRef();
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = typeNextLetter;
  });

  const startTyping = (sentence) => {
    setSentenceState("");
    intervalId.current = setInterval(() => {
      savedCallback.current(sentence);
    }, 500);
  };

  const stopTyping = () => {
    clearInterval(intervalId.current);
  };

  const typeNextLetter = (sentence) => {
    if (sentenceState.length === sentence.length) {
      stopTyping();
      return;
    }
    const nextLetterIndex = sentenceState.length;
    setSentenceState(sentenceState + sentence[nextLetterIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // TODO Display the text with typewriter effect
    // console.log(`The sentence to display is ${data.get("sentence")}`);
    startTyping(data.get("sentence"));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>
      {sentenceState && <p>You typed {sentenceState}</p>}
    </div>
  );
};

const typeWriterStyle = {
  margin: "10px 0 0 3px",
};

export default TypewriterEffect;
