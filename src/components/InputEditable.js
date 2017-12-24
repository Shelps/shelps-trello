/**
 * Created by italo on 8/16/17.
 */
import React, {Component} from  'react';
import auto from 'autosize';


class InputEditable extends Component {

    constructor(props){
        super(props);

        this.renderEditable = this.renderEditable.bind(this);
        this.renderText = this.renderText.bind(this);
        this.handleClickToEdit = this.handleClickToEdit.bind(this);
        this.handleEditcard = this.handleEditcard.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        const {id} = this.props;
        this.props.deleteComponent(id);
    }

    handleClickToEdit(){
        this.props.clickToEdit(this.props.id)
    }


    handleEditcard(event){

        if (event.type === 'keypress' && event.key !== 'Enter'){
            return;
        }
        const text = event.target.value;
        const {id} = this.props;

        if(text.trim().length){
            this.props.editComponent(id, text);
        }

    }

    renderEditable(){
        return (
            <div className="row troca">
                <div className="col-11">
                    <textarea
                        type="text"
                        className="form-control"
                        defaultValue={this.props.text}
                        autoFocus={true}
                        style={this.props.style}
                        placeholder={this.props.placeHolder}
                        onBlur={this.handleEditcard}
                        onKeyPress={this.handleEditcard}/>
                </div>
            </div>
        )
    }

    renderText(){
        return (
            <div className="row troca">
                <div className="col-11 show-trash">
                    <textarea
                        type="text"
                        className="form-control"
                        defaultValue={this.props.text}
                        readOnly
                        autoFocus={true}
                        style={this.props.style}
                        placeholder={this.props.placeHolder}
                        onClick={this.handleClickToEdit}/>
                </div>

                <div className="col trash">
                    <span onClick={this.handleDelete}>
                        <i title="Remover" className="ion-trash-b" ></i>
                    </span>
                </div>

            </div>
        )

    }

    componentDidMount(){
       auto(document.querySelectorAll("textarea"))
    }

    render(){
        if(this.props.edit){
            return this.renderEditable()
        }

        return this.renderText()
    }

}

export default InputEditable;
