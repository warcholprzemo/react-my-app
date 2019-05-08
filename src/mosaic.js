import React from 'react';
import Mosaic1 from './images/mosaic1.png';
import Mosaic2 from './images/mosaic2.png';
import Mosaic3 from './images/mosaic3.png';
import Mosaic4 from './images/mosaic4.png';

import Guinea1 from './images/guinea1.png';
import Guinea2 from './images/guinea2.png';
import Guinea3 from './images/guinea3.png';
import Guinea4 from './images/guinea4.png';

import { DragDropContextProvider, DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './mosaic.css';

/* GLOBAL VARIABLES */
let observer = null;
let global_new_position = null;
let global_old_position = null;
const ItemTypes = {
    PLATE: 'plate'
}
//const images = [Mosaic1, Mosaic2, Mosaic3, Mosaic4, null, null, null, null];
const images = [Guinea1, Guinea2, Guinea3, Guinea4, null, null, null, null];
const correct_images = images.slice(0, images.length / 2);


/* --- DRAG --- */

function shuffleArray(array) {
    /* HACKY - second part of array have null values */
    const start_array_length = array.length / 2;

    for (let i = start_array_length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const plateSource = {
    beginDrag(props){
        /* TODO: improve this loop */
        global_old_position = null;
        for(let i=0; i<images.length; i++){
            if(images[i] === props['image']){
                global_old_position = i;
                break;
            }
        }
        return {}
    },
    endDrag(props){
    }
}

function collect(connect, monitor){
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

class Plate extends React.Component {
    render(){
        const { id } = this.props;
        const { isDragging, connectDragSource } = this.props;
        return connectDragSource(
            <div className='mosaic plate' key={ '3' } style={{
                backgroundImage: "url(" + this.props.image + ")" ,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }}></div>
        )
    }
}

const DragablePlate = DragSource(ItemTypes.PLATE, plateSource, collect)(Plate);

/* --- DROP --- */

function emitChange(){
    observer(global_new_position);
}

function movePlate(new_position){
    global_new_position = new_position;
    emitChange();
}

function observe(observer_ref){
    observer = observer_ref;
    emitChange();
}

const plateTarget = {
    drop(props, monitor){
        movePlate(props.position);
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

function BoardPlate({position, connectDropTarget, isOver, children}){
    return connectDropTarget(
        <div className='mosaic plate border'>
            <DragablePlate image={ images[position] } />
        </div>
    )
}

const DropPlate = DropTarget(ItemTypes.PLATE, plateTarget, collectDrop)(BoardPlate);

function renderDropPlate(position){
    let current_key = '' + position + '-' + images[position];
    return (
        <DropPlate position={position} key={current_key}></DropPlate>
    );
}

export class Mosaic extends React.Component {
    constructor(props){
        super(props);
        shuffleArray(images);
        this.state = {
            info: 'Not win yet'
        }
    }

    componentDidMount(){
        observe((new_position) => {
            if(global_new_position !== null){
                [images[global_old_position], images[global_new_position]] = [images[global_new_position], images[global_old_position]];
            }

            /* TODO: move this code outside componentDidMount */
            let is_correct = true;
            let new_info = this.state.info;
            for(let i=0; i<correct_images.length; i++){
                is_correct &= (correct_images[i] == images[correct_images.length + i])
            }
            if(is_correct){
                new_info = 'WIN !!!';
            } else {
                new_info = 'Not win yet';
            }

            this.setState({
                info: new_info
            });
        });
    }

    render(){
        let imagesHtml_grid1 = [];
        let imagesHtml_grid2 = [];
        const box_length = images.length / 2;
        for(let i=0; i<box_length; i++){
            imagesHtml_grid1.push(
                renderDropPlate(i)
            );
        }
        for(let i=box_length; i<images.length; i++){
            imagesHtml_grid2.push(
                renderDropPlate(i)
            );
        }

        return(
            <div>
                <h2>Move puzzle to bottom box and compose correct image</h2>
                <div className='grid2x2'>
                    {imagesHtml_grid1}
                </div>
                <div className='divider'></div>
                <div className='grid2x2'>
                    {imagesHtml_grid2}
                </div>
                <div className='divider'></div>
                <div>{this.state.info}</div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Mosaic)
