import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './dashboard.module.scss';
import { Hero } from '@/model/hero';
import { reducerType } from '@/reducers';
import { addMessage } from '@/message/actions';
import { indexChange } from '@/heroes/actions';

interface IProps {
  heroes: Hero[];
  indexChange: (newIndex: number) => void;
  addMessage: (message: string) => void;
}

class Dashboard extends React.PureComponent<IProps> {
  onClick = (e: React.MouseEvent, id: number) => {
    const index = this.props.heroes.findIndex((hero) => hero.id === id);
    if (index > -1) {
      this.setState({
        selectedIndex: index
      });
      this.props.indexChange(index);
      this.props.addMessage(`选择英雄id:${id}`);
    }
  };
  render() {
    return (
      <div className={style.dashboard}>
        <h3>顶级英雄</h3>
        <div className={`${style.grid} ${style['grid-pad']}`}>
          {this.props.heroes.map((hero: Hero) => (
            <a
              className={`${style['col-1-4']}`}
              onClick={(e) => this.onClick(e, hero.id)}>
              <div className={`${style.module} ${style.hero}`}>
                <h4>{hero.name}</h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
export default connect(
  (state: reducerType) => ({
    heroes: state.heroesReducer.heroes.slice(0, 4)
  }),
  (dispatch: Dispatch) => ({
    indexChange: (newIndex: number) => dispatch(indexChange(newIndex)),
    addMessage: (message: string) => dispatch(addMessage(message))
  })
)(Dashboard);
