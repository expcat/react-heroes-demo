import React from 'react';
import './heroes.scss';
import { Hero } from '@/model/hero';
import Herodetail from '@/hero-detail/hero-detail';

class Heroes extends React.Component<
  { heroes: Hero[] },
  { heroes: Hero[]; selected: number }
> {
  constructor(props: { heroes: Hero[] }) {
    super(props);
    this.state = {
      heroes: this.props.heroes,
      selected: -1
    };
    this.handleOnHeroChange = this.handleOnHeroChange.bind(this);
  }
  onChange = (e: any) => {
    const newVal = e.target.value;
    this.props.heroes[this.state.selected].name = newVal;
    this.setState({
      heroes: this.props.heroes
    });
  };
  onClick = (e: any, id: number) => {
    const index = this.state.heroes.findIndex((hero) => hero.id === id);
    if (index > -1) {
      this.setState({
        selected: index
      });
    }
  };

  handleOnHeroChange(newName: string) {
    this.props.heroes[this.state.selected].name = newName;
    this.setState({
      heroes: this.props.heroes
    });
  }
  render() {
    const heroes = this.state.heroes;
    const selected = this.state.selected;
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
        {selected > -1 ? (
          <Herodetail hero={hero} onChange={this.handleOnHeroChange} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default Heroes;
