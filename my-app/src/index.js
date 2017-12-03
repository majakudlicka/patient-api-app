import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import allPatients from './components/allPatients.js';
import patientDetail from './components/patientDetail.js';
import notFound from './components/notFound.js';
import registerServiceWorker from './registerServiceWorker';

//React router
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/patient/:id" component={patientDetail} />
    <Route path="/" component={allPatients} />
    <Route path="*" component={notFound} />
  </Router>,
  document.getElementById('app')
);
registerServiceWorker();
