import React from 'react';
import { Dispatch } from 'redux';
import style from './heroes.module.scss';
import { connect } from 'react-redux';
import { Hero } from '@/model/hero';
import Herodetail from '@/hero-detail/hero-detail';
import { HEROES } from '@/model/mockheroes';
import { getHeroes, indexChange } from './actions';
import { addMessage } from '@/message/actions';

export interface IProps {
  heroes: Hero[];
  selectedIndex: number;
  getHeroes: (heroes: Hero[]) => void;
  indexChange: (newIndex: number) => void;
  addMessage: (message: string) => void;
}
class Heroes extends React.Component<IProps> {
  componentDidMount() {
    this.props.getHeroes(HEROES);
    this.props.addMessage(`获取英雄`);
  }

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
    const heroes = this.props.heroes;
    const selected = this.props.selectedIndex;
    const hero = heroes[selected];
    const heroesList = heroes.map((hero: Hero) => (
      <li key={hero.id} onClick={(e) => this.onClick(e, hero.id)}>
        <span className={style.badge}>{hero.id}</span>
        {hero.name}
      </li>
    ));
    return (
      <div>
        <h2>我的英雄</h2>
        <ul className={style.heroes}>{heroesList}</ul>
        {selected > -1 ? <Herodetail hero={hero} /> : ''}
      </div>
    );
  }
}
export default connect(
  (state: any) => ({
    heroes: state.heroesReducer.heroes,
    selectedIndex: state.heroesReducer.selectedIndex
  }),
  (dispatch: Dispatch) => ({
    getHeroes: (heroes: Hero[]) => dispatch(getHeroes(heroes)),
    indexChange: (newIndex: number) => dispatch(indexChange(newIndex)),
    addMessage: (message: string) => dispatch(addMessage(message))
  })
)(Heroes);
