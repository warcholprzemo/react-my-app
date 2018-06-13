import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
    // We don't need a construtor and its state now  
    //constructor(props){
    //    super(props);
    //    this.state = {
    //        value: null,
    //    }
    //}
    render(){
        return (
            <button className="square" onClick={() => this.props.onClick()  }>
                {this.props.value}
            </button>
        );
    }
}
*/
// And now because our Square class is very easy we can change it to functional components
function Square(props){
    console.log("props", props);
    return (
        <button className={props.winClass()} onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component{
    renderSquare(i){
        return (
            <Square 
                   value={this.props.squares[i]}
                   onClick={() => this.props.onClick(i)}
                   winClass={() => this.props.winClass(i)}
            />
        );
    }

    render(){
        return (
        <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

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

// --- Helper function
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
    <Game />,
    document.getElementById('root')
);
