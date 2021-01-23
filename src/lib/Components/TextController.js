import React, { Component } from 'react';
import TextControllerView from './TextControllerView';
import HighlightItem from './HighlightItem';
import Caret from './Caret';
import replaceAt from '../Utilities/ReplaceAt';
import updateHighlights from '../Utilities/UpdateHighlights';


class TextController extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.highlightDict = {};
        this.phrases = props.phrases;
        this.highlightedTextArr = [];
        this.state = {
            textInput: props.defaultText,
            result: "",
            caret:false,
            caretPos:0
        };
        this.node;
        this.regex = props.regex || /[.,\/#!$`~]/g
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        
        this.highlightPhrases = this.highlightPhrases.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseExit = this.handleMouseExit.bind(this);
    }

    //resets the control getting it ready for new input
    reset(){ 
        this.highlightDict = {};
        this.highlightedTextArr = [];
        this.setState({result:""});
    }
    
    //Calculate Highlights - reset control and parse Phrases
    calcHighlights(){
        let strInput = this.state.textInput;//.toLowerCase();
        //strInput = strInput.replace(".", " . ");
        this.reset();

        Object.keys(this.phrases).forEach(phraseSet => {
            this.parsePhrases(this.phrases[phraseSet],phraseSet,strInput);
        });
        console.log(this.highlightDict);
        this.highlightPhrases(this.highlightDict);
    }

    //parse the phrases in each phraseSet and create a HighlightDictionary w/ HighlightItems
    parsePhrases(phrases,phraseColor,strInput){
        for(let i=0;i<phrases.length;i++){ //loop through each of our phrases
            let startIdx = 0;
            // console.log(strInput);
            let string = strInput.replace(/[\n\r]/g, " -linebreak- ");
            string = string.replace(/\t/g, " -tab- "); //replace any linebreaks with a linebreak token
            string = string.replace(/\0/g, " -caret- ");
            string = string.replace(this.regex,"")+" "; //.replace(/\s/, ' ')
            let phraseIdx = string.indexOf(phrases[i],startIdx);
            console.log("prasing: ", string, phrases[i], phraseIdx, startIdx);
            while(phraseIdx != -1){
                var words = phrases[i].split(" "); //split phrase up into words
                // console.log(words);
                let offset = 0;
                words.forEach(word => { //for each word get its index and check if its in HighlightDict
                    if(word == "") {return;}
                    var wordIdx = string.indexOf(word,phraseIdx+offset);
                    // console.log(word, wordIdx,phraseIdx,offset);
                    offset = word.length;
                    let phrasesArry = [];
                    let idx = phraseIdx + "-" + phrases[i].length;
                    let phraseObj = {}; phraseObj[idx] = phrases[i];
                    phrasesArry.push(phraseObj);
                    //if not in HighlictDict create a new item, otherwise update it
                    if(!(wordIdx in this.highlightDict))
                        this.highlightDict[wordIdx] = new HighlightItem(word,phrasesArry,phraseColor,'textBlack', wordIdx)
                    else
                        this.highlightDict[wordIdx].update(phraseColor,phraseObj);
                });

                startIdx = phraseIdx+phrases[i].length;
                phraseIdx = string.indexOf(phrases[i], startIdx);
            }
        }        
    }

    //highlight phrases according to the provided highlightDictionary
    highlightPhrases(highlightDict, string){
        let s = this.state.textInput.replace(/[\n\r]/g, " -linebreak- ");
        s = s.replace(/\t/g, " -tab- ");
        s = s.replace(/\0/g, " -caret- ");
        s = s.replace(/\s/, ' ');
        this.highlightedTextArr = s.split(" "); 
        console.log(this.highlightedTextArr);

        for(var k in highlightDict){
            //console.log(k, highlightDict[k].content, highlightDict[k].color);
            this.highlightedTextArr = replaceAt( parseInt(k), highlightDict[k].content, highlightDict[k].color, highlightDict[k].textColor,this.highlightedTextArr, this.props.noWhiteSpace, this.regex );
        }
       
        //console.log(this.highlightedTextArr);
        //check if our array contains an object, if so pull out the JSX element, otherwise add a space
        for(var i=0;i<this.highlightedTextArr.length;i++){
            if(typeof this.highlightedTextArr[i] == 'object')
                this.highlightedTextArr[i] = this.highlightedTextArr[i].element;
            else if(this.highlightedTextArr[i] == "-linebreak-")
                this.highlightedTextArr[i] = <br key={i+this.highlightedTextArr[i]}/>;
            else if(this.highlightedTextArr[i] == "")
                this.highlightedTextArr[i] = <span style={{color:'transparent',height:'0px',width:'0px'}}key={i+this.highlightedTextArr[i]}></span>;
            else if(this.highlightedTextArr[i] == "-caret-")
                this.highlightedTextArr[i] = <Caret style={this.props.caret.style} key={i+this.highlightedTextArr[i]} timer={this.props.caret.timer} character={this.props.caret.character}/>;
            else if(this.highlightedTextArr[i] == "-tab-")
                this.highlightedTextArr[i] = <pre style={{color:'transparent'}}key={i+this.highlightedTextArr[i]}>&#9;</pre>;
            else //add a space between plain string elements
                this.highlightedTextArr[i] = <span key={i+this.highlightedTextArr[i]}> {this.highlightedTextArr[i]} </span>;
        }
        this.setState({result:this.highlightedTextArr});
    }

    //* Event Handlers *//

    handleCaretPosition = (s,offset,selectionIdx,string,caretOffset) =>{
        caretOffset = caretOffset || 0;
        if(this.props.caret){
            if(s.caret){
                string = string.replace("\0","");
                // console.log("removing caret: " + string)
                s.caret = false;             
            }
            if(s.caret == false){
                console.log("event change rm", selectionIdx, s.caretPos, offset);
                string = string.slice(0,selectionIdx+offset) + "\0" + string.slice(selectionIdx+offset);
                // console.log("adding caret: " + string)
                s.caret = true;
            }
            s.caretPos = selectionIdx+offset+caretOffset;
        }
        s.textInput = string;
        console.log(this.node.node.selectionStart,s.caretPos,this.state.caretPos);

        this.setState(s, function(){
            console.log(this.node.node.selectionStart,s.caretPos,this.state.caretPos);

            if(this.node.node){
                this.node.node.selectionStart = this.state.caretPos
                this.node.node.selectionEnd = this.state.caretPos
            }
            
            if(this.props.submitOnChange)
                this.calcHighlights();            
        });
    }

    handleTextAreaChange(e) { 

        console.log("event change", e.target.selectionStart);
        var s = Object.assign({}, this.state);
        var string = e.target.value;
        var selectionIdx = e.target.selectionStart;

        this.handleCaretPosition(s,0,selectionIdx,string);      
    }

    handleKeyDown = (e) =>{
        console.log("pressed", e.keyCode);
        var str;
        let s = Object.assign({},this.state);

        if(e.keyCode == 9 && this.props.tabbing == true){ //if we've pressed the tab key
            e.preventDefault();      
        }
        else if(e.keyCode == 8 && this.state.caret){ //if we pressed the backspace key
            //console.log("event", e.keyCode);
            str = s.textInput.replace("\0", "");

            let diff;
            if(this.node.node)
                diff = this.node.node.selectionEnd - this.node.node.selectionStart;

            str = str.slice(0, str.length+1-(diff > 0 ? diff-1 : diff));
            // console.log('deleted: ' + str);
            s.textInput = str;
            s.caret = false;
            // console.log(str);
            this.setState(s, function(){
                if(this.node.node){
                    this.node.node.selectionStart = this.state.caretPos
                    this.node.node.selectionEnd = this.state.caretPos
                }
                
                if(this.props.submitOnChange)
                    this.calcHighlights();
            });
           
        }  
    }

    handleKeyUp = (e) => {
        console.log("pressed", e.keyCode);
        var str;
        let s = Object.assign({},this.state);

        if(e.keyCode == 9 && this.props.tabbing == true){ //if we've pressed the tab key
            e.preventDefault();
            //console.log("event", e.keyCode);
            str = s.textInput.slice(0,e.target.selectionStart) + "\t" + s.textInput.slice(e.target.selectionStart);
            s.textInput = str;
            this.handleCaretPosition(s,2,e.target.selectionStart, str, -1);

            // if(this.node.node){
            //     this.node.node.selectionStart = this.state.caretPos
            //     this.node.node.selectionEnd = this.state.caretPos
            // }
        
        }      
        else if((e.keyCode >= 37 && e.keyCode <= 40 && this.state.caret)){ //if we've pressed an arrow key
            if(!s.textInput)return;
            console.log(e.keyCode)
            var offset = 0;
            switch(e.keyCode){
                case 37: offset = -1; break;
                case 39: offset = 1; break;
            }
            
            this.handleCaretPosition(s,offset,s.caretPos,s.textInput.slice());
        }
    }

    handleMouseDown = (e) => {
        console.log("event", e.target.selectionStart, this.node.node.selectionStart);
        let s = Object.assign({},this.state);
        if(!s.textInput) {return};

        this.handleCaretPosition(s,0,e.target.selectionStart, s.textInput);          
    }

    handleInputSubmit(){ this.calcHighlights(); }

    handleMouseOver(event){
        if(!this.props.hoverEffect){return};
        
        if(!event.target.getAttribute("class")){return};
        //get info from element our mouse entered
        let idx = event.target.getAttribute("data-myid");
        let Targetcolor = event.target.getAttribute("class").split(" ")[0];

        if(!this.highlightDict[idx]){return;} //if element idx doesn't exist in highlightDict return

        let PhrasesArr = this.highlightDict[idx].phraseArr; 
        let phraseArrEntry = PhrasesArr[PhrasesArr.length-1]; //get the highest priority phrase entry from the PhraseArray
        let tempcopy = Object.assign({}, this.highlightDict); //make a copy of our highlightDict so we don't modify the original

        let temp = updateHighlights(phraseArrEntry, tempcopy, Targetcolor);
        this.highlightPhrases(temp); 
    }

    handleMouseExit(){ 
        if(!this.props.hoverEffect){return};
        this.highlightPhrases(this.highlightDict);
    }
    
    componentDidMount(){
        if(this.props.autoStart)
            this.handleInputSubmit();
    }

    render = () => {
        return (
            <TextControllerView ref={(el) => {this.node = el}} onSubmit={this.handleInputSubmit} 
                handleTextAreaChange={this.handleTextAreaChange} 
                textInput={this.state.textInput} 
                result={this.state.result}
                onMouseOver={this.handleMouseOver}
                submitOnChange={this.props.submitOnChange}
                onMouseOut={this.handleMouseExit}
                handleKeyUp = {this.handleKeyUp}
                handleKeyDown = {this.handleKeyDown}
                cursorPos = {this.state.caretPos}
                handleMouseDown = {this.handleMouseDown}
                inputField={this.props.inputField} autoStart={this.props.autoStart}
                textAreaCols={this.props.textAreaCols} textAreaRows={this.props.textAreaRows}/>
        );
    }
}

export default TextController;
