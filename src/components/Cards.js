/**
 * Created by italo on 8/16/17.
 */
import React , {Component}   from 'react'
import Card from '../components/Card';
import InputEditable from './InputEditable';


class Cards extends Component{
    constructor(props){
        super(props);

        this.montCard = this.montCard.bind(this);
    }

    montCard(cards){

        cards = this.props.cards.map(card =>{
            return (
                <Card key={card.id} card={card}  moveCard = {this.props.moveCard}>
                    <InputEditable
                        id={card.id}
                        edit={card.edit}
                        text={card.text}
                        style={{backgroundColor:'white'}}
                        placeHolder = "Adicione Informações"
                        clickToEdit={this.props.clickToEdit}
                        editComponent = {this.props.editCard}
                        deleteComponent = {this.props.deleteCard}/>
                </Card>
            );

        });

        return cards

    }

    render(){

        return (
            <ul>
                {this.montCard()}
            </ul>
        )
    }
}

export default Cards;
