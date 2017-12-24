import Factory from './factory';

let db = Factory.returnDb();
const FactoryPanel = {

    listPanels: () =>{
        return db.getItem('panels')
            .then((value) => {
                if (value){
                    return value
                }else{
                    return []
                }
            })
    },

    savePanel: (panels) =>{
      db.setItem('panels', panels)

    }
};



export default FactoryPanel;