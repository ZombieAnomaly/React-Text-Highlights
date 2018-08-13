import React, { Component } from 'react';
import HighlightText from '../Components/HighlightText';

function replaceAt(index, word, phraseColor, textColor, highlightedTextArr,whiteSpace){
    let el = <HighlightText noWhiteSpace={whiteSpace} state={{color:phraseColor,textColor: textColor,content:word, key:index}} key={index}/>
    let idx = 0;
    let tempArr = highlightedTextArr.slice();

    for(var i=0;i<tempArr.length;i++){ 
        let temp = tempArr[i];

        if(index == idx || index == idx+1){
            tempArr[i] = {element:el,length:word.length};
            //console.log(tempArr[i])
        }
        idx +=  temp.length+1;      
    }
   
    return tempArr;
}

export default replaceAt;