import React, { Component } from 'react';
import HighlightText from './HighlightText';

class TextControl extends Component {

    constructor(props){
        super(props);
        this.props = props;
    }


    render() {
        if(this.props.inputField && !this.props.submitOnChange){
            return (
                <div className="HighlightInput">
                    <div onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} className="results">{this.props.result}</div>
                    <textarea cols={this.props.textAreaCols} rows={this.props.textAreaRows} className="HighlightInputTextArea" value={this.props.textInput} onChange={this.props.handleTextAreaChange}> </textarea>
                    <button onClick={this.props.onSubmit} className="HighlightInputButton">Submit</button>
                </div>
            );
        }
        else if(this.props.inputField && this.props.submitOnChange){
            return (
                <div className="HighlightInput">
                    <div onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} className="results">{this.props.result}</div>
                    <textarea cols={this.props.textAreaCols} rows={this.props.textAreaRows} className="HighlightInputTextArea" value={this.props.textInput} onChange={this.props.handleTextAreaChange}> </textarea>
                </div>
            );
        }else{
            return (
                <div className="HighlightInput">
                    <div onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} className="results">{this.props.result}</div>
                </div>
            );           
        }
    }
}

export default TextControl;
