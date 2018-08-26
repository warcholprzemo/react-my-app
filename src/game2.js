import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SomeDataList} from './somedatalist';

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

export class PlayerName extends React.Component{
    constructor(props){
        super(props);
        this.refToInput = React.createRef();
    }

    render(){
        return(
            <tr>
                <td><label htmlFor={this.props.customName}>{ this.props.customLabel }</label></td>
                <td><input type="text"
                           name={this.props.customName}
                           ref={this.refToInput}
                           defaultValue={this.props.defaultValue} /></td>
            </tr>
        );
    }
}

export class ActionButton extends React.Component{
    render(){
        return(
            <input type="submit" value={this.props.buttonValue} onClick={() => this.props.onClick()} />
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

export class HallOfFame extends React.Component{
    render(){
        return(
            <div>
                <SomeDataList endpoint_url='http://localhost:8000/tictactoe/allgames/'
                              custom_label='Hall of fame'
                />
            </div>
        )
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

function get_row_or_column(x, n){
    let [ax, bx] = [x, x];
    for(let i=0; i<4; i++){
        if(ax - 1 < 0)
            break;
        ax--;
    }
    for(let i=0; i<4; i++){
        if(bx+1 >= n)
            break;
        bx++;
    }
    return [ax, bx];
}

function chek_X_O_null(game, first_arg, sec_arg){
    let counterX = 0;
    let counterO = 0;
    let winnerXFields = [];
    let winnerOFields = [];
    if(game[first_arg][sec_arg] === 'X'){
        counterX++;
        counterO = 0;
        winnerXFields.push([first_arg, sec_arg]);
        winnerOFields = [];
    }
    else if(game[first_arg][sec_arg] === 'O') {
        counterX = 0;
        counterO++;
        winnerXFields = [];
        winnerOFields.push([first_arg, sec_arg]);
    }
    else{
        counterX = 0;
        counterO = 0;
        winnerXFields = [];
        winnerOFields = [];
    }
    return [counterX, counterO, winnerXFields, winnerOFields];
}

export function computeWinner(sizeBoard, game, curX, curY){

    /* compute winning on first diagonal */
    let [ax, ay, bx, by] = get_diag1(curX, curY, sizeBoard);
    let counterX = 0;
    let counterO = 0;
    let winnerXFields = [];
    let winnerOFields = [];

    while(ax <= bx && ay <= by){
        let x_o_null = chek_X_O_null(game, ax, ay);
        counterX += x_o_null[0];
        counterO += x_o_null[1];
        winnerXFields = winnerXFields.concat(x_o_null[2]);
        winnerOFields = winnerOFields.concat(x_o_null[3]);

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
        let x_o_null = chek_X_O_null(game, ax, ay);
        counterX += x_o_null[0];
        counterO += x_o_null[1];
        winnerXFields = winnerXFields.concat(x_o_null[2]);
        winnerOFields = winnerOFields.concat(x_o_null[3]);

        const hasWinner = check_counters(counterX, counterO,
                                         winnerXFields, winnerOFields);
        if(hasWinner)
            return hasWinner;
        ax++;
        ay--;
    }

    /* compute winning on column */
    [ax, bx] = get_row_or_column(curX, sizeBoard);
    counterX = 0;
    counterO = 0;
    winnerXFields = [];
    winnerOFields = [];
    while(ax <= bx){
        let x_o_null = chek_X_O_null(game, ax, curY);
        counterX += x_o_null[0];
        counterO += x_o_null[1];
        winnerXFields = winnerXFields.concat(x_o_null[2]);
        winnerOFields = winnerOFields.concat(x_o_null[3]);

        const hasWinner = check_counters(counterX, counterO,
                                         winnerXFields, winnerOFields);
        if(hasWinner)
            return hasWinner;
        ax++;
    }

    /* compute winning on row */
    [ax, bx] = get_row_or_column(curY, sizeBoard);
    counterX = 0;
    counterO = 0;
    winnerXFields = [];
    winnerOFields = [];
    while(ax <= bx){
        let x_o_null = chek_X_O_null(game, curX, ax);
        counterX += x_o_null[0];
        counterO += x_o_null[1];
        winnerXFields = winnerXFields.concat(x_o_null[2]);
        winnerOFields = winnerOFields.concat(x_o_null[3]);

        const hasWinner = check_counters(counterX, counterO,
                                         winnerXFields, winnerOFields);

        if(hasWinner)
            return hasWinner;
        ax++;
    }


    return {
        'xWin': false,
        'oWin': false,
        'winnerXFields': [],
        'winnerOFields': [],
    }
}
