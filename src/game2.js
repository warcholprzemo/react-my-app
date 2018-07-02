import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SizeBoardInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: 10,
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

function check_counters(counterX, counterO){
    if(counterX === 5)
        return {
            'xWin': true,
            'oWin': false,
        }
    else if(counterO === 5)
        return {
            'xWin': false,
            'oWin': true,
        }
    return null;
}

function get_diag1(x, y, n){
    /**
    @param x: current x-position
    @param y: current y-position
    @param n: sizeBoard
    */
    let [ax, bx] = [x, x];
    let [ay, by] = [y, y];

    for(let i=0; i<4; i++){
        if(ax-1 < 0 || ay-1 < 0)
            break;
        ax--;
        ay--;
    }

    for(let i=0; i<4; i++){
        if(bx+1 >= n || by+1 >= n)
            break;
        bx++;
        by++;
    }
    return [ax, ay, bx, by];
}

export function computeWinner(sizeBoard, game, curX, curY){

    /* compute winning on first diagonal */
    let [ax, ay, bx, by] = get_diag1(curX, curY, sizeBoard);
    let counterX = 0;
    let counterO = 0;

    while(ax <= bx && ay <= by){
        if(game[ax][ay] === 'X'){
            counterX++;
            counterO = 0;
        }
        else if(game[ax][ay] === 'O') {
            counterX = 0;
            counterO++;

        }
        else{
            counterX = 0;
            counterO = 0;
        }

        const hasWinner = check_counters(counterX, counterO);
        if(hasWinner) return hasWinner;
        ax++;
        ay++;
    }

    return {
        'xWin': false,
        'oWin': false,
    }
}
