import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Square, Board} from './game1'
import {SizeBoardInput, AcceptSizeButton, BigTicTacLabel,
        computeWinner} from './game2'



class Game extends React.Component{
    //Add history of moves
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i] || calculateTie(squares)){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleWinClass(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const data = baseCalculateWinner(squares);
        if(data && (data['a'] === i || data['b'] === i || data['c'] === i)){
            return "square winbox";
        }
        return "square";
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const isTie = calculateTie(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }
        else if(isTie){
            status = 'Tie!';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winClass={(i) => this.handleWinClass(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
// -----------------------


class BigTicTac extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sizeBoard: 10,
            rows: [],
            game: [],
            xNext: true,
            curX: -1,
            curY: -1,
        };
        this.setBigTicTacLabel = this.setBigTicTacLabel.bind(this);
    }

    getSquareClass(i, j){
        const mainClass = 'square';
        return (i+j) % 2 === 0 ? mainClass : mainClass + ' square-dark'
    }

    refreshBoard(){
        let rows = [];
        for(let i=0; i<this.state.sizeBoard; i++){
            let columns = [];
            for(let j=0; j<this.state.sizeBoard; j++){
                var uniqueId = "" + i + ";" + j;
                columns.push(<Square
                       value={this.showValue(i, j)}
                       onClick={() => this.justClick(i,j)}
                       winClass={() => this.getSquareClass(i,j)}
                       key={uniqueId}
                />);
            }
            rows.push(<div key={i} className="board-row">{columns}</div>);
        }
        this.setState({
            rows: rows,
        });
    }

    /* TODO: change to .bind(this) in constructor */
    handleButtonClick(){
        let game = [];
        for(let k=0;k<this.state.sizeBoard;k++){
            let game_columns = [];
            for(let m=0;m<this.state.sizeBoard;m++){
                game_columns.push(null);
            }
            game.push(game_columns);

        }
        this.setState({
            game: game,
        });

        this.refreshBoard();
    }

    showValue(i, j){
        /* TODO: setup some default. This try-catch is so ugly... */
        try{
            return this.state.game[i][j];
        } catch(TypeError){
            return null;
        }
    }

    handleInputValue(event){
        const maybeNumber = Number.parseInt(event.target.value);
        if(!isNaN(maybeNumber)){
            let inpValue = maybeNumber;
            this.setState({
                sizeBoard: inpValue
            });
        }
    }

    justClick(i,j){
        const xNext = this.state.xNext;
        let game = this.state.game;
        /* TODO: handle incorrect clicks (click on already marked field) */
        game[i][j] = xNext ? 'X' : 'O';
        this.setState({
            game: game,
            xNext: !xNext,
            curX: i,
            curY: j,
        });

        this.refreshBoard();
    }

    setBigTicTacLabel(){
        let counter = 0;
        if(!this.state.game.length || this.state.curY === -1)
            return "Number of moves: " + counter;

        const finalScore = computeWinner(this.state.sizeBoard, this.state.game,
                                         this.state.curX, this.state.curY);

        if(finalScore['xWin'])
            return "X is the winner!";
        if(finalScore['oWin'])
            return "O is the winner!";

        for(let i=0; i<this.state.sizeBoard; i++){
            for(let j=0; j<this.state.sizeBoard; j++){
                if(this.state.game[i][j])
                    counter++;
            }
        }
        return "Number of moves: " + counter;
    }

    render(){
        return(
            <div className="game">
                <div className="input-field">
                    <label>Setup size of go-board. Range [2; 20], default 10</label>
                    <SizeBoardInput onChange={event => this.handleInputValue(event)} />
                    <AcceptSizeButton onClick={() => this.handleButtonClick() }/>
                    <div className="mrg-top">
                        {this.state.rows}
                    </div>
                    <BigTicTacLabel setInfo={this.setBigTicTacLabel} />
                </div>
            </div>
        );
    }
}

class BattleField extends React.Component{
    render(){
        return(
            <div className="battlefield">
                <Game />
                <BigTicTac />
            </div>
        );
    }
}


// --- Helper function
/* TODO: move below functions to another file */
function baseCalculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0; i<lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return{
                'winner': squares[a],
                'a': a,
                'b': b,
                'c': c,
            }
        }
    }
    return null;
}

function calculateWinner(squares){
    const winnerData = baseCalculateWinner(squares);
    if(winnerData){
        return winnerData['winner'];
    }
    return null;
}

function calculateTie(squares){
    let counter=0;
    for(let i=0; i<squares.length; i++){
        if(squares[i])
            counter++;
    }
    return counter === 9;
}

ReactDOM.render(
    <BattleField />,
    document.getElementById('root')
);
