import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';

const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
});

const middleware = applyMiddleware(logger, thunk);

const store = createStore(
    reducer,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f)
)

export default store;