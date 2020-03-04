import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages } from './actions';
import style from './message.module.scss';
import { StoreState } from '@/reducers';

function Message() {
  const messages = useSelector((state: StoreState) => state.message);
  const dispatch = useDispatch();
  if (messages.length === 0) return null;

  const clearMsg = () => {
    dispatch(clearMessages());
  };
  return (
    <div className={style.messages}>
      <h2>消息</h2>
      <button className={style.clear} onClick={clearMsg}>
        clear
      </button>
      {messages.map((message: string, index: number) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}
export default Message;
