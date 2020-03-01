import React from 'react';
import { Dispatch } from 'redux';
import './heroes.scss';
import { connect } from 'react-redux';
import { Hero } from '@/model/hero';
import Herodetail from '@/hero-detail/hero-detail';
import { getHeroes, indexChange } from './actions';
import { HEROES } from '@/model/mockheroes';
import { StoreState } from '@/store/store';

export interface IProps {
  heroes: Hero[];
  selectedIndex: number;
  getHeroes: (heroes: Hero[]) => void;
  indexChange: (newIndex: number) => void;
}
class Heroes extends React.Component<IProps> {
  componentDidMount() {
    this.props.getHeroes(HEROES);
  }

  onClick = (e: React.MouseEvent, id: number) => {
    const index = this.props.heroes.findIndex((hero) => hero.id === id);
    if (index > -1) {
      // console.log('index:' + index);
      this.setState({
        selectedIndex: index
      });
      this.props.indexChange(index);
    }
  };
  render() {
    const heroes = this.props.heroes;
    const selected = this.props.selectedIndex;
    const hero = heroes[selected];
    const heroesList = heroes.map((hero: Hero) => (
      <li key={hero.id} onClick={(e) => this.onClick(e, hero.id)}>
        <span className="badge">{hero.id}</span>
        {hero.name}
      </li>
    ));
    return (
      <div>
        <h2>我的英雄</h2>
        <ul className="heroes">{heroesList}</ul>
        {selected > -1 ? <Herodetail hero={hero} /> : ''}
      </div>
    );
  }
}
const mapStateToProps = (state: StoreState): StoreState => ({
  heroes: state.heroes,
  selectedIndex: state.selectedIndex
});
export default connect(mapStateToProps, (dispatch: Dispatch) => ({
  getHeroes: (heroes: Hero[]) => dispatch(getHeroes(heroes)),
  indexChange: (newIndex: number) => dispatch(indexChange(newIndex))
}))(Heroes);
