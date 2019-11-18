import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.jsx';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { initialState as gameState } from '../reducers/gameState'
import { initialState as shipPlacement } from '../reducers/placement'

it('renders without crashing', () => {
  const mockStore = configureStore([])
  const initialState = {
    gameState,
    shipPlacement
  }
  const store = mockStore(initialState)

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
