/**
 * Created by italo on 8/16/17.
 */
import * as ActionTypes from '../constants/ActionTypes';
import uuid from 'uuid';
import FActoryCard from '../factorys/factoryCard';

const createCard = (value) => {
    return {
        type: ActionTypes.CREATE_CARD,
        payLoad: {
            id: uuid.v4(),
            edit: false,
            text: value

        }
    }
};

const editCard = (edited) =>{
    return {
        type: ActionTypes.EDIT_CARD,
        payLoad: edited
    }
};

const deleteCard = (id) =>{
    return {
        type: ActionTypes.DELETE_CARD,
        payLoad: {id}
    }
};


const listCard = (value) => {
    return {
        type: ActionTypes.LIST_CARD,
        payLoad: value
    }
};


const listCards = () => {
    return (dispatch) => {
        FActoryCard.listCards()
            .then((value) => {
                dispatch(listCard(value))
            })
    }
};

export default {
    createCard,
    editCard,
    deleteCard,
    listCards
}
