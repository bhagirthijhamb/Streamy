import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers);
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#root'));

// App Challenges
// Need to be able to navigate around to separate pages in our app
// Need to allow a user to login/logout
// Need to handle forms in Redux
// Need to master CRUD operations in React/Redux
// Need good error handling
