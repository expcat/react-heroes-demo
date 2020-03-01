import {
  MESSAGE_GET,
  MESSAGE_GET_TYPE,
  MESSAGE_CLEAR,
  MESSAGE_CLEAR_TYPE,
  MESSAGE_ADD,
  MESSAGE_ADD_TYPE
} from './const';

export interface MESSAGE_GETaction {
  type: MESSAGE_GET_TYPE;
}

export type MessageGetAction = MESSAGE_GETaction;

export const getMessages = (): MESSAGE_GETaction => ({
  type: MESSAGE_GET
});

export interface MESSAGE_CLEARaction {
  type: MESSAGE_CLEAR_TYPE;
}

export type MessageClearAction = MESSAGE_CLEARaction;

export const clearMessages = (): MESSAGE_CLEARaction => ({
  type: MESSAGE_CLEAR
});

export interface MESSAGE_ADDaction {
  type: MESSAGE_ADD_TYPE;
  payload: string;
}

export type MessageAddAction = MESSAGE_ADDaction;

export const addMessage = (message: string): MESSAGE_ADDaction => ({
  type: MESSAGE_ADD,
  payload: message
});
