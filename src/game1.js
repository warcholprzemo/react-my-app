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
export function Square(props){
    return (
        <button className={props.winClass()} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export class Board extends React.Component{
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

