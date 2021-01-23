import React, { Component } from 'react';
import HighlightText from '../Components/HighlightText';

function replaceAt(index, word, phraseColor, textColor, highlightedTextArr,whiteSpace, regex){
    let idx = 0;
    let tempArr = highlightedTextArr.slice();
    // console.log(tempArr);
    for(var i=0;i<tempArr.length;i++){ 
        let temp = tempArr[i];
        let len = word.length;

        if (temp.length > 1 && typeof temp == "string") {
            // console.log('trimming: ', temp);
            temp = temp.replace(regex,"");
        }

        // console.log(temp,word,idx,index, temp.length)

        if(index == idx){
            let el = <HighlightText noWhiteSpace={whiteSpace} state={{color:phraseColor,textColor: textColor,content:temp, key:index}} key={index+word}/>
            // console.log(len, temp.length);
            tempArr[i] = {element:el,length:temp.length};
            // console.log(tempArr[i]);
            return tempArr;
        }
        idx +=  temp.length > 1 ? temp.length+1: temp.length+1;      
    }
   
    return tempArr;
}

export default replaceAt;