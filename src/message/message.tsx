import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { clearMessages } from './actions';
import style from './message.module.scss';

export interface IProps {
  messages: string[];
  clearMessages: () => void;
}

class Message extends React.PureComponent<IProps> {
  componentWillReceiveProps(nextProps: IProps) {
    this.setState(nextProps);
  }
  render() {
    if (this.props.messages.length === 0) return null;
    return (
      <div className={style.messages}>
        <h2>消息</h2>
        <button className={style.clear} onClick={this.props.clearMessages}>
          clear
        </button>
        {this.props.messages.map((message: string, index: number) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    );
  }
}
export default connect(
  (state: any) => ({ messages: state.messageReducer }),
  (dispatch: Dispatch) => ({
    clearMessages: () => dispatch(clearMessages())
  })
)(Message);
