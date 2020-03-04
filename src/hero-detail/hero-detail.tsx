import React, { useState, useEffect } from 'react';
import style from './hero-detail.module.scss';
import { Hero } from '@/model/hero';
import { filter } from '@/common/filter';
import { modifyHero, getHero } from './actions';
import { match } from 'react-router-dom';
import { addMessage } from '@/message/actions';
import { History, LocationState } from 'history';
import { useDispatch } from 'react-redux';

export interface IProps {
  history: History<LocationState>;
  match: match<{ id: string }>;
}

function Herodetail(props: IProps) {
  const [hero, setHero] = useState<Hero>({
    id: 0,
    name: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getHero(+props.match.params.id).then((res) => {
      setHero(res.data);
      dispatch(addMessage(`获取英雄 id=${res.data?.id}`));
    });
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    hero.name = e.target.value;
    setHero({
      id: hero.id,
      name: e.target.value
    });
  }

  function goBack() {
    props.history.goBack();
  }

  function goSave() {
    modifyHero(hero).then((res) => {
      dispatch(addMessage(`更新英雄 id=${hero.id}`));
      props.history.goBack();
    });
  }

  if (hero.id === 0) return null;
  return (
    <div className={style['heor-detail']}>
      <h2>{filter.uppercase(hero.name)} 详情</h2>
      <div>
        <span>id: </span>
        {hero.id}
      </div>
      <div>
        <span>name: </span>
        {hero.name}
      </div>
      <div>
        <label>
          name:
          <input onChange={(e) => onChange(e)} value={hero.name} />
        </label>
      </div>
      <button onClick={goBack}>返回</button>
      <button onClick={goSave}>保存</button>
    </div>
  );
}
export default Herodetail;
