import React, { Component } from 'react';

class HighlightItem{ //class to create a highlight index for the HightlightDictionary in the HighlightControl
    constructor(content,phraseArr,phraseColor,textColor, idx){
        this.content = content;
        this.phraseArr = phraseArr;
        this.color = phraseColor;
        this.textColor = textColor;
        this.idx = idx;
    }

    updateColor(phraseColor,textColor){
        this.color = phraseColor;
        this.textColor = textColor;
    }
    //a method to udate an entry in the HighlightDictionary, only updates the color and adds on a class
    update(phraseColor,phraseObj){
        this.color = phraseColor;
        this.phraseArr.push(phraseObj);
    }
    
}

export default HighlightItem;