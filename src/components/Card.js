import React , {Component}   from 'react'
import PropTypes from 'prop-types';
import {DragSource , DropTarget} from 'react-dnd';
import * as Types from '../constants/Types';


class Card extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {connectDragSource, connectDropTarget, isDragging} = this.props;
        return connectDragSource(
            connectDropTarget(
                <li className={"col-xs-12 "+"is-drag-"+isDragging}>
                    {this.props.children}
                </li>
            )
        )
    }
}

// Drag and Dorp

const dragNDropSrc = {
    beginDrag(props) {
        return {
            id: props.card.id
        }
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    }
};


const collectTarget = (connect, monitor) =>{
    return {
        connectDropTarget: connect.dropTarget()
    }
};

const cardHoverTarget = {
    hover(props, monitor){

        const {id} = props.card;
        const monitorProps = monitor.getItem();
        const monitorId = monitorProps.id;

        if (id !== monitorId){
            return props.moveCard(id, monitorId);
        }

        // return props.moveCard(id, monitorId);
    }
};


export default DragSource(Types.CARD, dragNDropSrc, collect)(
    DropTarget(Types.CARD, cardHoverTarget, collectTarget)(Card)
)