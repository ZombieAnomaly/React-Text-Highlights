import React, { Component } from 'react';
import HighlightText from '../Components/HighlightText';

function replaceAt(index, word, phraseColor, textColor, highlightedTextArr,whiteSpace){
    let el = <HighlightText noWhiteSpace={whiteSpace} state={{color:phraseColor,textColor: textColor,content:word, key:index}} key={index+word}/>
    let idx = 0;
    let tempArr = highlightedTextArr.slice();
   // console.log(tempArr);
    for(var i=0;i<tempArr.length;i++){ 
        let temp = tempArr[i] == "" ? " " : tempArr[i];
        
        if (temp.length > 1 && typeof temp == "string") {
            //console.log('trimming: ', temp);
            temp = temp.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"");
        }

        //console.log(temp,word,idx,index, temp.length)

        if(index == idx){
            tempArr[i] = {element:el,length:word.length};
            //console.log(tempArr[i]);
            return tempArr;
        }
        idx +=  temp.length > 1 ? temp.length+1: temp.length;      
    }
   
    return tempArr;
}

export default replaceAt;