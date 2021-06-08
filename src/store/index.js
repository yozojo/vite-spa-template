import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();

const initialState = {};
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
middleware.push(routerMiddleware(history));

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  connectRouter(history)(reducers),
  initialState,
  composeEnhancer(applyMiddleware(...middleware)),
);
