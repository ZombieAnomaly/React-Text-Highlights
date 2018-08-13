import React, { Component } from 'react';
import containsObject from '../Utilities/ContainsObject';
import HighlightItem from '../Components/HighlightItem';

function updateHighlights(phraseArrEntry, temp, Targetcolor){
    //loop through our highlightDict checking if our currentElement contains our phraseArrEntry
    for(var k in temp){
        let currentElement = temp[k];
        
        if(containsObject(phraseArrEntry, currentElement.phraseArr)){ //currentElement contains our phraseArrEntry
            for(var i=0;i<currentElement.phraseArr.length;i++){ //loop through currentElement phraseArray

                //current element has a phrase that isn't the phraseArrEntry
                if(Object.keys(currentElement.phraseArr[i])[0] != Object.keys(phraseArrEntry)[0])
                    checkForUnnormal(currentElement,i,phraseArrEntry,Targetcolor,temp);
            }
        }    
    }
    return temp;
}

function checkForUnnormal(currentElement,i,phraseArrEntry,Targetcolor,temp){
    //loop through our highlightDict checking if our innerElement contains our 'unnormal' phrase
    for(var j in temp){ 
        let innerElement = temp[j];
        let innerElementCopy = new HighlightItem(innerElement.content,innerElement.phraseArr,innerElement.color,innerElement.textColor,innerElement.idx);

        //we've found an element that contains the 'unnormal' phrase
        if(containsObject(currentElement.phraseArr[i],innerElement.phraseArr)){
            //if it also contains our target phrase, update its color to the target phrase color otherwise it should be transparent
            if(containsObject(phraseArrEntry,innerElementCopy.phraseArr)){
                innerElementCopy.updateColor(Targetcolor,'textWhite');
            }else
                innerElementCopy.updateColor("none", 'textBlack');       
        }else if(containsObject(phraseArrEntry,innerElement.phraseArr))
            innerElementCopy.updateColor(Targetcolor,'textWhite');
        
        temp[innerElementCopy.idx] = innerElementCopy;  
    }
}

export default updateHighlights;