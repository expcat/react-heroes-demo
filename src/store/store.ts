import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Hero } from '@/model/hero';
import reducer from '@/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export type StoreState = { heroes: Hero[]; selectedIndex: number };

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
