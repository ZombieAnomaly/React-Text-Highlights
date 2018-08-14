# React-Text-Highlights ![Build](https://img.shields.io/badge/build-passing-brightgreen.svg) ![NPM](https://img.shields.io/badge/npm-5.5.1-brightgreen.svg) ![Package](https://img.shields.io/badge/npm%20package-1.1.1-brightgreen.svg)

This is a React component to highlight phrases or a group of phrases within text.
You can find a [demo here](https://zombieanomaly.github.io/React-Text-Highlights)

----

# Installation
    npm i --save react-text-highlights
    
----

# Important Concept
This library allows you to highlight a variety of phrases or *'phrase sets'* in any color you'd like. **Even phrases that collide or overlap can be highlighted!** This library priorities phrases and their highlight in order from lowest-highest. 

Taking the example from below in the **Usage** section, phrases that are blue are the lowest priority and phrases that are red are the highest priority. Our red phrase *'highlight'* will overlap the blue phrase *'highlight effect'* and when you hover over the word *'highlight'* red will be of highest priority and blue (or any other colliding phrases) will go transparent.

**TLDR: order your phrases from lowest priority - highest priority and the component will handle collisions / overlapping, always favoring the higher priority highlights.**

----

# Usage

    import '../node_modules/react-text-highlights/styles.css';
    import {TextController} from 'react-text-highlights';

    class App extends Component {
      
      render() {
        return (
        
      <TextController  phrases={{ 'blue':['highlight effect'], 'yellow':['text highlighting'], 'red':['highlight', 'non-highlighted'] }} 
        noWhiteSpace={true} inputField={true} textAreaCols={50} textAreaRows={5} autoStart={true} 
        defaultText="this is an example of text highlighting! some text can be highlighted and some non-highlighted. hover over phrases to isolate their highlight effect."/>

        );
      }
    }
    
    export default App;
    
----

# Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| phrases | Dictionary | yes | a dictionary of phrases to highlight (priority lowest-highest) |
| noWhiteSpace | Boolean | no | Specifies if you want additional white space around highlighted text (default false)|
| inputField | Boolean | no | Will component display textarea for string input? (default false) |
| autoStart | Boolean | no | If true component will automatically highlight text on render (default false) |
| defaultText | String | no | text to be highlighted (can be modified if inputField enabled) |
| textAreaRows | Number | no | if inputField enabled this sets rows of the TextArea |
| textAreaCols | Number | no | if inputField enabled this sets columns of the TextArea |

----

# License
MIT License - modify, fork, clone and use this however you want or need friends.

----
