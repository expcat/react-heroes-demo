import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import Heroes from '@/heroes/heroes';
import { store } from './store/store';
import Message from '@/message/message';

const title = '英雄之旅';

ReactDOM.render(
  <Provider store={store}>
    <h1>{title}</h1>
    <Heroes />
    <Message />
  </Provider>,
  document.getElementById('root')
);
