import React, { useEffect, useState, useRef } from 'react';
import style from './heroes.module.scss';
import { useDispatch } from 'react-redux';
import { Hero } from '@/model/hero';
import { addMessage } from '@/message/actions';
import { getHeroes, addHero, delHero } from './actions';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';

function Heroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const newHeroName = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getHeroes().then((res) => setHeroes(res.data));
  }, []);

  const toAdd = () => {
    const heroName = newHeroName.current?.value;
    if (heroName) {
      addHero({ id: 0, name: heroName }).then((res) => {
        if (res.status === 200) {
          const input = newHeroName.current;
          if (input) {
            input.value = '';
          }
          const newHero = res.data;
          setHeroes(update(heroes, { $push: [newHero] }));
          dispatch(addMessage(`添加英雄 id=${newHero.id}`));
        }
      });
    }
  };

  const toDelete = (id: number) => {
    delHero(id).then((res) => {
      if (res.status === 200) {
        const index = heroes.findIndex((hero) => hero.id === id);
        if (index > -1) {
          setHeroes(update(heroes, { $splice: [[index, 1]] }));
          dispatch(addMessage(`删除英雄 id=${id}`));
        }
      }
    });
  };

  return (
    <div>
      <h2>我的英雄</h2>
      <div>
        <label>
          英雄名字:
          <input ref={newHeroName} />
        </label>
        <button onClick={toAdd}>添加</button>
      </div>
      <ul className={style.heroes}>
        {heroes?.map((hero: Hero) => (
          <li key={hero.id}>
            <Link className={`${style['col-1-4']}`} to={`/detail/${hero.id}`}>
              <span className={style.badge}>{hero.id}</span>
              {hero.name}
            </Link>
            <button
              className={style.delete}
              title="删除英雄"
              onClick={(e) => toDelete(hero.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Heroes;
