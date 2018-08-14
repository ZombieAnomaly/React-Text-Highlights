import React, { Component } from 'react';
import TextControllerView from './TextControllerView';
import HighlightItem from './HighlightItem';
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
            result: ""
        }

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
        let strInput = this.state.textInput.toLowerCase();
        this.reset();

        Object.keys(this.phrases).forEach(phraseSet => {
            this.parsePhrases(this.phrases[phraseSet],phraseSet,strInput);
        });
        this.highlightPhrases(this.highlightDict);
    }

    //parse the phrases in each phraseSet and create a HighlightDictionary w/ HighlightItems
    parsePhrases(phrases,phraseColor,strInput){
        for(let i=0;i<phrases.length;i++){ //loop through each of our phrases
            let startIdx = 0;
            let string = strInput.replace(/\s\s+/g, ' ');
            let phraseIdx = string.indexOf(phrases[i],startIdx);
            console.log(phrases[i]);
            while(phraseIdx != -1){
                var words = phrases[i].split(" "); //split phrase up into words
                let offset = 0;
                words.forEach(word => { //for each word get its index and check if its in HighlightDict
                    var wordIdx = strInput.indexOf(word,phraseIdx+offset);
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
                phraseIdx = strInput.indexOf(phrases[i], startIdx);
            }
        }        
    }

    //highlight phrases according to the provided highlightDictionary
    highlightPhrases(highlightDict){
        this.highlightedTextArr = this.state.textInput.split(" ");

        for(var k in highlightDict){
            //console.log(k);
            this.highlightedTextArr = replaceAt( parseInt(k), highlightDict[k].content, highlightDict[k].color, highlightDict[k].textColor,this.highlightedTextArr, this.props.noWhiteSpace );
        }
       
        //check if our array contains an object, if so pull out the JSX element, otherwise add a space
        for(var i=0;i<this.highlightedTextArr.length;i++){
            if(typeof this.highlightedTextArr[i] == 'object')
                this.highlightedTextArr[i] = this.highlightedTextArr[i].element;
            else //add a space between plain string elements
                this.highlightedTextArr[i] = <span key={i+this.highlightedTextArr[i]}> {this.highlightedTextArr[i]} </span>;
        }
        this.setState({result:this.highlightedTextArr});
    }

    //* Event Handlers *//
    handleTextAreaChange(event) { this.setState({textInput: event.target.value}); }

    handleInputSubmit(){ this.calcHighlights(); }

    handleMouseOver(event){
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

    handleMouseExit(){ this.highlightPhrases(this.highlightDict); }
    
    componentDidMount(){
        if(this.props.autoStart)
            this.handleInputSubmit();
    }

    render() {
        return (
            <TextControllerView onSubmit={this.handleInputSubmit} 
                handleTextAreaChange={this.handleTextAreaChange} 
                textInput={this.state.textInput} 
                result={this.state.result}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseExit}
                inputField={this.props.inputField} autoStart={this.props.autoStart}
                textAreaCols={this.props.textAreaCols} textAreaRows={this.props.textAreaRows}/>
        );
    }
}

export default TextController;
