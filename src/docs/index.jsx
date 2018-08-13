import React from "react";
import { render } from "react-dom";
import TextController from "../../lib/Components/TextController";
import "./styles.css";

function Demo() {

  let phraseDictFirst = {
    'red': ['text highlighting some text can', 'highlighted', 'phrases to isolate'],
    'yellow': ['text highlighting', 'isolate their highlight']
  }

  let phraseDictSecond = {
    'green': ['adorable puppy party'],
    'red': ['an adorable puppy', 'will deliver new', ],
    'blue': ['adorable', 'new technology'],
  }

  return (
    <div className = "Container">

      <h1>This is a demo of React-Text-Highlights</h1>
      
      <TextController phrases={phraseDictFirst} noWhiteSpace={true} inputField={false} autoStart={true} defaultText="this is an example of text highlighting some text can be highlighted and some non-highlighted. hover over phrases to isolate their highlight effect."/>
        <hr/>
      <TextController phrases={phraseDictSecond} noWhiteSpace={false} inputField={true} textAreaCols={30} textAreaRows={5} autoStart={false} defaultText="an adorable puppy party will deliver new technology"/>

    </div>
  );
}

render(<Demo />, document.getElementById("app"));
