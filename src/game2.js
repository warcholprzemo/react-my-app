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

function check_counters(counterX, counterO, winnerXFields, winnerOFields){
    if(counterX === 5)
        return {
            'xWin': true,
            'oWin': false,
            'winnerXFields': winnerXFields,
            'winnerOFields': [],
        }
    else if(counterO === 5)
        return {
            'xWin': false,
            'oWin': true,
            'winnerXFields': [],
            'winnerOFields': winnerOFields,
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

function get_diag2(x, y, n){
    let [ax, bx] = [x, x];
    let [ay, by] = [y, y];

    for(let i=0; i<4; i++){
        if(ax-1 < 0 || ay+1 >= n)
            break;
        ax--;
        ay++;
    }
    for(let i=0; i<4; i++){
        if(bx+1 >= n || by-1 <0)
            break
        bx++;
        by--;
    }
    return [ax, ay, bx, by];
}

export function computeWinner(sizeBoard, game, curX, curY){

    /* compute winning on first diagonal */
    let [ax, ay, bx, by] = get_diag1(curX, curY, sizeBoard);
    let counterX = 0;
    let counterO = 0;
    let winnerXFields = [];
    let winnerOFields = [];

    while(ax <= bx && ay <= by){
        if(game[ax][ay] === 'X'){
            counterX++;
            counterO = 0;
            winnerXFields.push([ax,ay]);
            winnerOFields = [];
        }
        else if(game[ax][ay] === 'O') {
            counterX = 0;
            counterO++;
            winnerXFields = [];
            winnerOFields.push([ax,ay]);
        }
        else{
            counterX = 0;
            counterO = 0;
            winnerXFields = [];
            winnerOFields = [];
        }

        const hasWinner = check_counters(counterX, counterO,
                                         winnerXFields, winnerOFields);
        if(hasWinner)
            return hasWinner;
        ax++;
        ay++;
    }

    /* compute winning on second diagonal */
    [ax, ay, bx, by] = get_diag2(curX, curY, sizeBoard);
    counterX = 0;
    counterO = 0;
    winnerXFields = [];
    winnerOFields = [];

    while(ax <= bx && ay >= by){
        if(game[ax][ay] === 'X'){
            counterX++;
            counterO = 0;
            winnerXFields.push([ax,ay]);
            winnerOFields = [];
        }
        else if(game[ax][ay] === 'O') {
            counterX = 0;
            counterO++;
            winnerXFields = [];
            winnerOFields.push([ax,ay]);
        }
        else{
            counterX = 0;
            counterO = 0;
            winnerXFields = [];
            winnerOFields = [];
        }

        const hasWinner = check_counters(counterX, counterO,
                                         winnerXFields, winnerOFields);
        if(hasWinner)
            return hasWinner;
        ax++;
        ay--;
    }


    return {
        'xWin': false,
        'oWin': false,
        'winnerXFields': [],
        'winnerOFields': [],
    }
}
