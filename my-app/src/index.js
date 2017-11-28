import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {composeWithDevTools} from 'redux-devtools-extension';
import homeReducer from './reducers/index.js';
import allPatients from './components/allPatients.js';
import patientDetail from './components/patientDetail.js';
import notFound from './components/notFound.js';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  homeReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/patient/:id" component={patientDetail} />
      <Route path="/" component={allPatients} />
      <Route path="*" component={notFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
