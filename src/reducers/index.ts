// import { combineReducers } from 'redux';
import { StoreState } from '@/store/store';
import update from 'immutability-helper';
import { ModifyAction } from '@/hero-detail/actions';
import { HERO_MODIFY } from '@/hero-detail/const';
import { HeroesGetAction, IndexChangeAction } from '@/heroes/actions';
import { HEROES_GET, INDEX_CHANGE } from '@/heroes/const';
import {
  MessageGetAction,
  MessageClearAction,
  MessageAddAction
} from '@/message/actions';
import { MESSAGE_GET, MESSAGE_CLEAR, MESSAGE_ADD } from '@/message/const';
import { combineReducers } from 'redux';

const initHerosState: StoreState = {
  heroes: [],
  selectedIndex: -1
};

function heroesReducer(
  state: StoreState = initHerosState,
  action: ModifyAction | HeroesGetAction | IndexChangeAction
): StoreState {
  switch (action.type) {
    case HERO_MODIFY:
      return update(state, {
        heroes: {
          [state.selectedIndex]: { name: { $set: action.payload.newName } }
        }
      });
    case HEROES_GET:
      return update(state, {
        heroes: {
          $set: action.payload.heroes
        }
      });
    case INDEX_CHANGE:
      return update(state, {
        selectedIndex: {
          $set: action.payload.newIndex
        }
      });
    default:
      return state;
  }
}

const initMessagesStore: string[] = [];

function messageReducer(
  state: string[] = initMessagesStore,
  action: MessageGetAction | MessageClearAction | MessageAddAction
) {
  switch (action.type) {
    case MESSAGE_GET:
      return state;
    case MESSAGE_CLEAR:
      return [];
    case MESSAGE_ADD:
      return update(state, { $push: [action.payload] });
    default:
      return state;
  }
}

const reducer = combineReducers({
  heroesReducer,
  messageReducer
});
export default reducer;
