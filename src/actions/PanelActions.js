import * as ActionTypes from '../constants/ActionTypes';
import uuid from 'uuid';
import FactoryPanel from '../factorys/factoryPanel';


const createPanel = (value) =>{
    return {
        type: ActionTypes.CREATE_PANEL,
        payLoad: {
            id: uuid.v4(),
            text: value,
            edit: false,
            cards: []

        }
    }
};

const listPanel = (panels) => {
    return {
        type: ActionTypes.LIST_PANEL,
        payLoad: panels
    }
};

const editPanel = (edited) =>{
    return {
        type: ActionTypes.EDIT_PANEL,
        payLoad: edited
    }
};


const deletePanel = (id) =>{
    return {

        type: ActionTypes.DELETE_PANEL,
        payLoad: {id}
    }
};

const movePanel = (id, monitorId) =>{
    return {
        type: ActionTypes.MOVE_PANEL,
        payLoad: {id,monitorId}
    }
};

const moveCard = (id, monitorId) =>{
    return {
        type: ActionTypes.MOVE_CARD,
        payLoad: {id,monitorId}
    }
};
const insertInPanel = (panelId, cardId) =>{
    return {
        type: ActionTypes.INSERT_IN_PANEL,
        payLoad: {panelId, cardId}
    }
};

const removeFromPanel = (panelId, cardId) =>{
    return {
        type: ActionTypes.REMOVE_FROM_PANEL,
        payLoad: {panelId, cardId}
    }
};

const listPanelS = () =>{
  return function (dispatch) {
      return FactoryPanel.listPanels()
          .then(panels => {
              dispatch(listPanel(panels));
          }).catch(error =>{
              throw(error);
          });
  };
};


export default {
    createPanel,
    editPanel,
    deletePanel,
    movePanel,
    moveCard,
    insertInPanel,
    removeFromPanel,
    listPanel,
    listPanelS
}