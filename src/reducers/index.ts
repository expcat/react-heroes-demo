import update from 'immutability-helper';
import {
  MessageGetAction,
  MessageClearAction,
  MessageAddAction
} from '@/message/actions';
import { MESSAGE_GET, MESSAGE_CLEAR, MESSAGE_ADD } from '@/message/const';

export type StoreState = { message: string[] };

const initMessagesStore: StoreState = {
  message: []
};

export default (
  state: StoreState = initMessagesStore,
  action: MessageGetAction | MessageClearAction | MessageAddAction
): StoreState => {
  switch (action.type) {
    case MESSAGE_GET:
      return state;
    case MESSAGE_CLEAR:
      return {
        message: []
      };
    case MESSAGE_ADD:
      return update(state, { message: { $push: [action.payload] } });
    default:
      return state;
  }
};
