/**
 * Created by italo on 8/16/17.
 */
import * as ActionTypes from '../constants/ActionTypes';
import FactoryCard from '../factorys/factoryCard';

let cards;
export default function cards(state = [], action){
    switch(action.type){
        case ActionTypes.CREATE_CARD:
            cards = [
                ...state,
                action.payLoad
            ];

            FactoryCard.saveCard(cards);

            return cards;
        break;
        case ActionTypes.EDIT_CARD:

            cards = state.map(card =>{
                const {id} = action.payLoad;

                if (id === card.id) return Object.assign({}, card, action.payLoad);
                return card
            });
            FactoryCard.saveCard(cards);

            return cards;

        break;
        case ActionTypes.DELETE_CARD:
            const {id} = action.payLoad;
            cards = state.filter(card => id !== card.id);

            FactoryCard.saveCard(cards);

            return cards;
        break;

        case ActionTypes.LIST_CARD:
            return Object.assign([], action.payLoad);

        default:
            return state;
    }
}