import { createStore , applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import thunk from 'redux-thunk';


const history = createHistory();
const middlewares = routerMiddleware(history);


const configStore = (initialState) =>{
    return createStore(
        reducers,
        initialState,
       applyMiddleware(thunk, middlewares)
    )
};

export default {configStore, history};