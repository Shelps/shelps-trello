import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import CardReducer from './CardReducer';
import PanelReducer from './PanelReducer';

export default combineReducers({
    router: routerReducer,
    cards: CardReducer,
    panels: PanelReducer
})