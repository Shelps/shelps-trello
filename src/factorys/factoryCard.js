import Factory from './factory';

let db = Factory.returnDb();
const FactoryCard = {

    listCards: () =>{
        return db.getItem('cards')
            .then((value) => {
                if (value){
                    return value
                }else{
                    return []
                }
            })
    },

    saveCard: (cards) =>{
        db.setItem('cards', cards)
    }
};



export default FactoryCard;