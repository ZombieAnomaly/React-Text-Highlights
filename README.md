# React-Text-Highlights

This is a React componenet to highlight phrases and text.
You can find a [demo here](https://zombieanomaly.github.io/React-Highlight-Text/)

----

# Usage

    import React, { Component } from 'react';
    import logo from './logo.svg';
    import './App.css';
    import TextController from './Components/TextController';

    class App extends Component {
      
      constructor(props){
        super(props);
        
        this.phraseDictFirst = {
          'red': ['text highlighting! some text can', 'highlighted', 'phrases to isolate'],
          'yellow': ['text highlighting', 'isolate their highlight']
        }
        
        this.phraseDictSecond = {
          'green': ['adorable puppy party'],
          'red': ['an adorable puppy', 'will deliver new', ],
          'blue': ['adorable', 'new technology'],
        }
      }

      render() {
        return (
            <TextController  phrases={this.phraseDictFirst} noWhiteSpace={true} input={false} autoStart={true} defaultText="this is an example of text highlighting! some text can be highlighted and some non-highlighted. hover over phrases to isolate their highlight effect."/>
        
            <TextController phrases={this.phraseDictSecond} noWhiteSpace={false} input={true} autoStart={false} defaultText="an adorable puppy party will deliver new technology"/>
        );
      }
    }
    
    export default App;
    
----

# Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| phrases | Dictionary | yes | a dictionary of phrases to highlight |
| noWhiteSpace | Boolean | no | Specifies if you want additional white space around highlighted text (default false)|
| inputField | Boolean | no | Will component display textarea for string input? (default false) |
| autoStart | Boolean | no | If true component will automatically highlight text on render (default false) |
| defaultText | String | no | text to be highlighted (can be modified if inputField enabled |

----

# License
MIT License - modify, fork, clone and use this however you want or need friends.
