/**
 * Created by italo on 8/18/17.
 */

import * as ActionTypes from '../constants/ActionTypes';
import updade from 'immutability-helper';
import FactoryPanel from '../factorys/factoryPanel';


export default function panels(state = [], action){
    let panels;
    switch(action.type){
        case ActionTypes.CREATE_PANEL:
            panels = [
                ...state,
                action.payLoad
            ];

            FactoryPanel.savePanel(panels);
            return panels;
            break;

        case ActionTypes.EDIT_PANEL:
            panels = state.map(panel =>{
                const {id} = action.payLoad;

                if (id === panel.id) return Object.assign({}, panel, action.payLoad);
                return panel
            });
            FactoryPanel.savePanel(panels);
            return panels;
            break;

        case ActionTypes.DELETE_PANEL:
            const {id} = action.payLoad;
            panels = state.filter(panel => id !== panel.id);

            FactoryPanel.savePanel(panels);
            return panels;
            break;

        case ActionTypes.MOVE_PANEL:
            const targetDropId = action.payLoad.id;
            const monitorId = action.payLoad.monitorId;

            const targetIndex = state.findIndex(panel => panel.id === targetDropId);
            const monitorIndex = state.findIndex(panel => panel.id === monitorId);


            panels = updade(state, {
                $splice: [
                    [monitorIndex,1],
                    [targetIndex, 0, state.find(panel => panel.id === monitorId)]
                ]
            });

            FactoryPanel.savePanel(panels);

            return panels;

            break;

        case ActionTypes.MOVE_CARD:
            const targetCardDropId = action.payLoad.id;
            const monitorCardId = action.payLoad.monitorId;

            let targetPanel = state.filter(panel => panel.cards.indexOf(targetCardDropId) >= 0);
            let monitorPanel = state.filter(panel => panel.cards.indexOf(monitorCardId) >= 0);

            targetPanel = targetPanel[0];
            monitorPanel = monitorPanel[0];

            const targetCardIndex = targetPanel.cards.indexOf(targetCardDropId);
            const monitorCardIndex = monitorPanel.cards.indexOf(monitorCardId);

            if (targetPanel.id === monitorPanel.id){

                panels = state.map((panel) =>{
                    const panelId = panel.id;

                    if(monitorPanel.id !== panelId){
                        return panel;
                    }

                    return Object.assign({}, panel, {
                        cards: updade(monitorPanel.cards, {
                            $splice: [
                                [monitorCardIndex, 1],
                                [targetCardIndex, 0, monitorCardId]
                            ]
                        })
                    });
                });

                FactoryPanel.savePanel(panels);
                return panels;
            }


            panels =  state.map((panel) =>{
                const panelId = panel.id;

                if (targetPanel.id === panelId){
                    return Object.assign({}, panel, {
                        cards: updade(panel.cards, {
                            $splice: [
                                [targetCardIndex, 0, monitorCardId]
                            ]
                        })
                    })
                }

                if (monitorPanel.id === panelId){
                    return Object.assign({}, panel, {
                        cards: updade(panel.cards, {
                            $splice: [
                                [monitorCardIndex, 1]
                            ]
                        })
                    })
                }

                return panel
            });

            FactoryPanel.savePanel(panels);
            return panels;


            panels = updade(state, {

                $splice: [
                    [monitorIndex,1],
                    [targetIndex, 0, state.find(panel => panel.id === monitorId)]
                ]
            });

            FactoryPanel.savePanel(panels);

            return panels;

        break;

        case ActionTypes.INSERT_IN_PANEL:

            const panelIdInsert = action.payLoad.panelId;
            const cardIdInsert = action.payLoad.cardId;

            panels = state.map((panel)=>{
                if (panel.cards.indexOf(cardIdInsert) >= 0){
                    const {cards} = panel;
                    return Object.assign({},panel,{
                        cards: cards.filter((cardId) =>{
                            return cardId !== cardIdInsert
                        })
                    })
                }

                if (panel.id === panelIdInsert){
                    const {cards} = panel;
                    return Object.assign({}, panel,{
                        cards: cards.concat(cardIdInsert)
                    })
                }

                return panel;
            });

            FactoryPanel.savePanel(panels);
            return panels;
        break;

        case ActionTypes.REMOVE_FROM_PANEL:
            const panelIdRemove = action.payLoad.panelId;
            const cardIdRemove = action.payLoad.cardId;

            panels =  state.map((panel) => {

                const {cards} = panel;
                if (panelIdRemove !== panel.id) {
                    return panel
                }

                return Object.assign({}, panel, {
                    cards: cards.filter(id => cardIdRemove !== id)
                })
            });

            FactoryPanel.savePanel(panels);

            return panels;

            break;

        case ActionTypes.LIST_PANEL:
            return Object.assign([], action.payLoad);

            break;
        default:
            return state;
    }
}