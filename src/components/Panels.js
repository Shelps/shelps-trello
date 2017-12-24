
/**
 * Created by italo on 8/17/17.
 */

import React, {Component} from 'react';
import Panel from './Painel';


class Panels extends Component {
    constructor(props){
        super(props);
    }

    render(){

        const panels = this.props.panels.map( panel => (
            <Panel
                key={panel.id}
                panel={panel}
                editPanel = {this.props.editPanel}
                deletePanel = {this.props.deletePanel}
                movePanel = {this.props.movePanel}
            />
        ));
        return (
            <div className="row flex-xl-nowrap">
                {panels}

                <div className="col-md-2">
                    <a onClick={this.props.addPanel} style={{"cursor":"pointer"}}>
                        <i className="ion-plus-round"></i> Painel
                    </a>
                </div>
            </div>
        )
    }
}

export default Panels;

