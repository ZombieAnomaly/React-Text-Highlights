import React, { Component } from 'react';

class Caret extends Component{
    constructor(props){
        super(props)
        this.props = props;
        this.state = { visible:true};
        
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ visible: !this.state.visible })
        }, this.props.timer);
      }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        if(this.state.visible)
            return(<span className="Caret" style={this.props.style}>{this.props.character}</span>)
        else{
            return(<span className="Caret" style={{...this.props.style,...{color:'transparent'}}}>{this.props.character}</span>)
        }
    }
}

export default Caret;