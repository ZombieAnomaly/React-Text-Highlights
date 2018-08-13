import React, { Component } from 'react';
import HighlightTextView from './HighlightTextView';

class HighlightText extends Component {

    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return (
            <HighlightTextView noWhiteSpace={this.props.noWhiteSpace} onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} state={this.props.state} />
        );
    }
}

export default HighlightText;
