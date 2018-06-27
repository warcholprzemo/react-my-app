import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SizeBoardInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: 5,
        }
    }

    setInputValue(evt){
        this.setState({
            inputValue: evt.target.value
        });
        this.props.onChange(evt);
    }

    render(){
        return(
            <input type="number"
                   min="2"
                   max="20"
                   value={this.state.inputValue}
                   onChange={evt => this.setInputValue(evt)}
                   className="sizeinput"/>
        );
    }
}

export class AcceptSizeButton extends React.Component{
    render(){
        return(
            <input type="submit" value="Generate" onClick={() => this.props.onClick()} />
        );
    }
}

export class BigTicTacLabel extends React.Component{
    render(){
        return(
            <label>{this.props.setInfo()}</label>
        );
    }
}
