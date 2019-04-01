import React from 'react';
//import Logo from './images/logo.png';
import Mosaic1 from './images/mosaic1.png';
import Mosaic2 from './images/mosaic2.png';
import Mosaic3 from './images/mosaic3.png';
import Mosaic4 from './images/mosaic4.png';

import { DragDropContextProvider, DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {DropBoardSquare}  from './chess-board.js';

import './mosaic.css';

function shuffleArray(array) {
    return array;
    /*
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    */
}

export class Mosaic extends React.Component {
    render(){
        const images = [Mosaic1, Mosaic2, Mosaic3, Mosaic4];
        shuffleArray(images);
        let imagesHtml = [];
        for(let i=0; i<images.length; i++){
            imagesHtml.push(
                <img src={ images[i] } title='plate' className='mosaic plate' key={ 'plate-' + i } />
            )
        }

        return(
            <div>
                <div className='grid2x2'>
                    {imagesHtml}
                </div>
                <div className='divider'></div>
                <div className='grid2x2'>
                    <div style={{backgroundColor:'#ddd', width:'50px', height:'50px'}} className='mosaic plate'></div>
                    <div style={{backgroundColor:'#ddd', width:'50px', height:'50px'}} className='mosaic plate'></div>
                    <div style={{backgroundColor:'#ddd', width:'50px', height:'50px'}} className='mosaic plate'></div>
                    <div style={{backgroundColor:'#ddd', width:'50px', height:'50px'}} className='mosaic plate'></div>
                </div>
            </div>
        );
    }
}