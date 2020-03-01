// import { combineReducers } from 'redux';
import { StoreState } from '@/store/store';
import update from 'immutability-helper';
import { ModifyAction } from '@/hero-detail/actions';
import { HERO_MODIFY } from '@/hero-detail/const';
import { HeroesGetAction, IndexChangeAction } from '@/heroes/actions';
import { HEROES_GET, INDEX_CHANGE } from '@/heroes/const';

const initStoreState: StoreState = {
  heroes: [],
  selectedIndex: -1
};

function reducer(
  state: StoreState = initStoreState,
  action: ModifyAction | HeroesGetAction | IndexChangeAction
): StoreState {
  let newState;
  switch (action.type) {
    case HERO_MODIFY:
      newState = update(state, {
        heroes: {
          [state.selectedIndex]: { name: { $set: action.payload.newName } }
        }
      });
      return newState;
    case HEROES_GET:
      return update(state, {
        heroes: {
          $set: action.payload.heroes
        }
      });
    case INDEX_CHANGE:
      newState = update(state, {
        selectedIndex: {
          $set: action.payload.newIndex
        }
      });
      return newState;
    default:
      return state;
  }
}
export default reducer;
