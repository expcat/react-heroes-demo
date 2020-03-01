import React from 'react';
import { Hero } from '@/model/hero';
import { filter } from '@/common/filter';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { modify } from './actions';

export interface IProps {
  hero: Hero;
  onChange: (newName: string) => void;
}

class Herodetail extends React.Component<IProps, Hero> {
  constructor(props: IProps) {
    super(props);
    this.state = props.hero;
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState(nextProps.hero);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    this.setState({
      name: newName
    });
    this.props.onChange(newName);
  }
  render() {
    return (
      <div>
        <h2>{filter.uppercase(this.state.name)} Details</h2>
        <div>
          <span>id: </span>
          {this.state.id}
        </div>
        <div>
          <span>name: </span>
          {this.state.name}
        </div>
        <label>
          name:
          <input onChange={this.onChange.bind(this)} value={this.state.name} />
        </label>
      </div>
    );
  }
}

export default connect(null, (dispatch: Dispatch) => ({
  onChange: (newName: string) => dispatch(modify(newName))
}))(Herodetail);
