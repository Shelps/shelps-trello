/**
 * Created by italo on 8/15/17.
 */
import React , {Component}   from 'react'
import Cards from '../components/Cards';
import InputEditable from '../components/InputEditable';
import {connect} from 'react-redux';
import CardActions from '../actions/CardActions';
import PanelActions from '../actions/PanelActions';
import PropTypes from 'prop-types';
import * as Types from '../constants/Types';
import {DragSource , DropTarget} from 'react-dnd';
import './Panel.scss';


class Panel extends Component {
    constructor(props){
        super(props);

        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeletePanel = this.handleDeletePanel.bind(this);
    }
    handleCreateCard(){
        const {id} = this.props.panel;
        this.props.createCard(id);
    }

    handleDeleteCard(cardId){
        const panelId = this.props.panel.id;
        this.props.deleteCard(panelId, cardId);
    }

    handleDeletePanel(panelId){
        const {cards} = this.props.panel;
        this.props.deletePanel(panelId);

        cards.forEach(card => this.props.deleteCard(card.id));
    }

    componentDidMount(){
        this.props.listCards()
    }

    render(){
        const {cards, panel, connectDragSource, connectDragPreview, connectDropTarget, isDragging} = this.props;
        const filteredCards = panel.cards
            .map(id => cards.find(card => card.id === id))
            .filter(card => card);
        return connectDragPreview(
            connectDropTarget(
                <div className="col-md-3">
                    {connectDragSource(
                        <div className="card">
                            <div className="card-header">
                                <InputEditable
                                    id={panel.id}
                                    edit={panel.edit}
                                    text={panel.text}
                                    editComponent = {this.props.editPanel}
                                    clickToEdit = {this.props.editPanel}
                                    deleteComponent = {this.handleDeletePanel}
                                    placeHolder = "Adicione um titulo"
                                    />
                            </div>

                            <div className="card-block">
                                <Cards
                                    cards={filteredCards}
                                    clickToEdit = {this.props.editCard}
                                    editCard = {this.props.editCard}
                                    deleteCard = {this.handleDeleteCard}
                                    moveCard = {this.props.moveCard}

                                />
                            </div>

                            <div className="card-footer">
                                <a onClick={this.handleCreateCard}>
                                    <i className="ion-plus-round"></i> Adiconar um cartão...
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )
        )
    }
}

Panel.propTypes = {
    createCard: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>{
    return{
        cards: state.cards
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        listCards: () => dispatch(CardActions.listCards()),
        createCard: (panelId) => {
            const createNewCard = CardActions.createCard();
            dispatch(createNewCard);
            const {id} = createNewCard.payLoad;
            dispatch(PanelActions.insertInPanel(panelId, id))
        },
        editCard: (id, text) => {
            const edited = {id};

            if(!text){
                edited.edit = true;
            }else{
                edited.edit = false;
                edited.text = text;
            }

            dispatch(CardActions.editCard(edited));
        },

        deleteCard: (panelId, cardId) => {
            dispatch(CardActions.deleteCard(cardId));

            if (!panelId){
                return
            }

            return dispatch(PanelActions.removeFromPanel(panelId, cardId))

        },

        moveCard: (id, monitorId) => dispatch(PanelActions.moveCard(id, monitorId)),

        insertInPanel: (id, monitorId) => dispatch(PanelActions.insertInPanel(id,monitorId))

    }
};

// Drag and Dorp

const dragNDropSrc = {
    beginDrag(props) {
        return {
            id: props.panel.id
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

 const panelHoverTarget = {
     hover(props, monitor){

         const {id, cards} = props.panel;
         const monitorProps = monitor.getItem();
         const monitorType = monitor.getItemType();
         const monitorId = monitorProps.id;

         if (id !== monitorId && Types.PANEL === monitorType){
             return props.movePanel(id, monitorId);
         }

         if (!cards.length && Types.CARD === monitorType){
             return props.insertInPanel(id, monitorId);
         }
     }
 };

export default connect(mapStateToProps,mapDispatchToProps)(
    DragSource(Types.PANEL, dragNDropSrc, collect)(
        DropTarget([Types.CARD,Types.PANEL], panelHoverTarget, collectTarget)(Panel)
    )
);
