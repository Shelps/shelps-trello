import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import config from './store';
import Home from './containers/Home';
import Localforage from 'localforage';
import Factory from './factorys/factory';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';




const store = config.configStore();
        ReactDOM.render(
            <div>
                <header className="header">
                    <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded navbar-cunston">
                        <div className="center-header">
                            <button
                                className="navbar-toggler navbar-toggler-right"
                                type="button"
                                data-toggle="collapse">

                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a className="navbar-brand" href="">
                                <img src="img/logo_trello.png" className="img-fluid" alt="logo"/>
                            </a>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">

                            </ul>
                        </div>
                    </nav>
                </header>
                <main id="main" className="container-fluid">
                    <Provider store={store}>
                        <ConnectedRouter history={config.history}>
                            <Route exact path="/" component={Home}/>
                        </ConnectedRouter>
                    </Provider>
                </main>
            </div>,
            document.getElementById('root'));

        // store.subscribe(() =>{
        //     console.log('savou');
        //     db.setItem('kanban', store.getState())
        // });


registerServiceWorker();
