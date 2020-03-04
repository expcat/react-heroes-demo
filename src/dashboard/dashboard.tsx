import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './dashboard.module.scss';
import { Hero } from '@/model/hero';
import { Link } from 'react-router-dom';
import { getHeroes } from '@/heroes/actions';
import { AxiosResponse } from 'axios';
import HeroSearch from '@/hero-search/hero-search';

interface IProps {
  getHeroes: () => Promise<AxiosResponse<Hero[]>>;
}

function Dashboard(props: IProps) {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    getHeroes().then((res) => setHeroes(res.data.slice(0, 4)));
  }, []);

  return (
    <div>
      <div className={style.dashboard}>
        <h3>顶级英雄</h3>
        <div className={`${style.grid} ${style['grid-pad']}`}>
          {heroes?.map((hero: Hero) => (
            <Link
              className={`${style['col-1-4']}`}
              to={`/detail/${hero.id}`}
              key={hero.id}>
              <div className={`${style.module} ${style.hero}`}>
                <h4>{hero.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <HeroSearch></HeroSearch>
    </div>
  );
}
export default connect(null, (dispatch: Dispatch) => ({
  getHeroes: () => getHeroes()
}))(Dashboard);
