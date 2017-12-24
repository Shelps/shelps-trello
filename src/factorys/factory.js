import Localforage from 'localforage';

let db = null;
export default {

    createDb: (function () {
        db = Localforage.createInstance({
            name:"kanban_react",
            driver: Localforage.INDEXEDDB,
            description: 'User to store panels and cards',
            version: 1.0
        });
    })(),

    returnDb: function () {
        return db;
    }
};