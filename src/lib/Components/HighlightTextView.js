import React, { Component } from 'react';

function HighlightTextView(props){

    if(props.noWhiteSpace){
        return(
            <span data-myid={props.state.key} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} className={props.state.color + " " + props.state.textColor + " textHighlight"}>{props.state.content}</span> 
        )
    }else{
        return(
            <span data-myid={props.state.key} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} className={props.state.color + " " + props.state.textColor}>{props.state.content} </span> 
        )
    }

}

export default HighlightTextView;