import React from 'react';
import { Hero } from '@/model/hero';
import { filter } from '@/common/filter';

class Herodetail extends React.Component<{ hero: Hero; onChange: any }> {
  onChange = (e: any) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const hero = this.props.hero;
    return (
      <div>
        <h2>{filter.uppercase(hero.name)} Details</h2>
        <div>
          <span>id: </span>
          {hero.id}
        </div>
        <div>
          <span>name: </span>
          {hero.name}
        </div>
        <label>
          name:
          <input onChange={(e) => this.onChange(e)} value={hero.name} />
        </label>
      </div>
    );
  }
}
export default Herodetail;
