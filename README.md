# React-Text-Highlights

This is a React componenet to highlight phrases and text.
You can find a [demo here](https://zombieanomaly.github.io/React-Text-Highlights)

----

# Usage

    import '../node_modules/react-text-highlights/styles.css';
    import {TextController} from 'react-text-highlights';

    class App extends Component {
      
      render() {
        return (
      <TextController  phrases={{
          'blue':['highlight effect'], 
          'yellow':['text highlighting'],
          'red':['highlight']}} 
        noWhiteSpace={true} inputField={true} textAreaCols={50} textAreaRows={5} autoStart={true} defaultText="this is an example of text highlighting! some text can be highlighted and some non-highlighted. hover over phrases to isolate their highlight effect."/>

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
| textAreaRows | Number | no | if inputField enabled this sets rows of the TextArea |
| textAreaCols | Number | no | if inputField enabled this sets columns of the TextArea |

----

# Installation
    npm i --save react-text-highlights

----

# License
MIT License - modify, fork, clone and use this however you want or need friends.

----
