import React from 'react';
import { DropTarget } from 'react-dnd';
import {moveKnight, knightPosition, observe, canMoveKnight} from './chess-engine';

const ItemTypes = {
    KNIGHT: 'knight',
}

const squareTarget = {
    drop(props, monitor){
        if(canMoveKnight(props.x, props.y)){
            moveKnight(props.x, props.y)
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

function Square({black, children}){
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';
    return (
        <div style={{
            backgroundColor: fill,
            color: stroke,
            width: '100%',
            height: '100%',
        }}>
            {children}
        </div>
    );
}

function BoardSquare({ x, y, connectDropTarget, isOver, children }){
    const black = (x + y) % 2 === 1;
    return connectDropTarget(
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}>
            <Square black={black}>{ children }</Square>
            {isOver && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
        </div>
    )
}

export const DropBoardSquare = DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
