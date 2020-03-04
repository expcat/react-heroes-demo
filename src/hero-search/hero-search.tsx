import React, { useState } from 'react';
import style from './hero-search.module.scss';
import { Hero } from '@/model/hero';
import { searchHeroes } from './action';
import { Link } from 'react-router-dom';
import { debounce } from 'ts-debounce';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/message/actions';

function HeroSearch() {
  const [heroes, setHeroes] = useState<Hero[]>();
  const dispatch = useDispatch();
  const toSearch = debounce((name: string) => {
    searchHeroes(name).then((res) => {
      if (res.status === 200) {
        setHeroes(res.data);
        dispatch(addMessage(`找到匹配的英雄 ${name}`));
      } else {
        setHeroes([]);
        dispatch(addMessage(`没有英雄匹配 ${name}`));
      }
    });
  }, 300);
  return (
    <div>
      <h4>
        <label>英雄搜索</label>
      </h4>
      <input onChange={(e) => toSearch(e.target.value)} />
      <ul className={style['search-result']}>
        {heroes?.map((hero) => (
          <li key={hero.id}>
            <Link to={`/detail/${hero.id}`}>{hero.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HeroSearch;
