import React, {Component} from 'react';
import './Home.scss';
import Panels from '../components/Panels';
import {DragDropContext} from 'react-dnd';
import HTML5BackEnd from 'react-dnd-html5-backend';
import PanelActions from '../actions/PanelActions';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);

        this.handleCreatePanel = this.handleCreatePanel.bind(this);
    }

    handleCreatePanel(){
        this.props.createPanel()
    }

    componentDidMount(){
       this.props.listPanel()
    }

    render(){
        const {panels} = this.props;
        return(
            <div>
                <Panels
                    panels={panels}
                    editPanel ={this.props.editPanel}
                    deletePanel = {this.props.deletePanel}
                    movePanel = {this.props.movePanel}
                    addPanel = {this.handleCreatePanel}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return {
        panels: state.panels
    }
};


const mapDispatchToProps = (dispatch) =>{
    return {
        listPanel: () => dispatch(PanelActions.listPanelS()),
        createPanel: ()=> dispatch(PanelActions.createPanel()),
        editPanel: (id, value) => {
            const edited = {id};
            if (!value){
                edited.edit =true;
            }else {
                edited.edit =false;
                edited.text = value;
            }
            dispatch(PanelActions.editPanel(edited))
        },

        deletePanel: (id) => {
            alert("Vai remover todos os cartão tambem, deseja continuar?");
            dispatch(PanelActions.deletePanel(id))
        },
        movePanel: (id, monitorId) => dispatch(PanelActions.movePanel(id, monitorId))

    }
};

export default DragDropContext(HTML5BackEnd)( connect(mapStateToProps, mapDispatchToProps)(Home))