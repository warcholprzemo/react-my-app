import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SizeBoardInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render(){
        return(
            <input type="text" value={this.state.inputValue}
                   onChange={evt => this.updateInputValue(evt)}
                   className="sizeinput"/>
        );
    }

    updateInputValue(evt){
        this.setState({
            inputValue: evt.target.value
        });
    }

}

export class AcceptSizeButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <input type="submit" value="Generate" />
        );
    }
}