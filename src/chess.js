import React from 'react';
import {moveKnight, knightPosition, observe, canMoveKnight} from './chess-engine';
import { DragDropContextProvider, DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {DropBoardSquare}  from './chess-board.js';

const ItemTypes = {
    KNIGHT: 'knight',
}

const knightSource = {
    beginDrag(props){
        return {}
    }
}

function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

function Knight({ connectDragSource, x, y, isDragging }){
    const black = (x + y) % 2 === 1;
    const stroke = black ? 'white' : 'black';
    const bgcolor = black ? 'black' : 'white';
    return connectDragSource(
        <div style={{
            fontSize: '30px',
            textAlign: 'center',
            cursor: 'move',
            fontWeight: 'bold',
            display: 'block',
            width: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: stroke,
            backgroundColor: bgcolor
        }}>♘</div>
    );
}

const DragableKnight = DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)


function handleSquareClick(toX, toY){
    if(canMoveKnight(toX, toY)){
        moveKnight(toX, toY);
    }
}



function renderPiece(x, y, [knightX, knightY]){
    if(x === knightX && y === knightY){
        return <DragableKnight x={x} y={y} />
    }
}


function renderSquare(i, knightPosition){
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }}
         onClick={() => handleSquareClick(x, y) } >
            <DropBoardSquare x={x} y={y}>
                {renderPiece(x, y, knightPosition)}
            </DropBoardSquare>
        </div>
    );
}



function ChessBoard(knightPosition22){
    const squares = [];
    for(let i=0; i< 64; i++){
        squares.push(renderSquare(i, knightPosition22));
    }
    return(
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {squares}
        </div>
    );
}


class Fuu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_position: [0, 0]
        }
    }

    componentDidMount(){
        observe((new_position) => {
            this.setState({
                current_position: new_position
            });
        });
    }

    render(){
        return ChessBoard(this.state.current_position)
    }
}

export default DragDropContext(HTML5Backend)(Fuu);