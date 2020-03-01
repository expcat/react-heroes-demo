import {
  HEROES_GET,
  HEROES_GET_TYPE,
  INDEX_CHANGE,
  INDEX_CHANGE_TYPE
} from './const';
import { Hero } from '@/model/hero';

export interface IHEROES_GETaction {
  type: HEROES_GET_TYPE;
  payload: {
    heroes: Hero[];
  };
}

export interface IINDEX_CHANGEaction {
  type: INDEX_CHANGE_TYPE;
  payload: {
    newIndex: number;
  };
}

// 定义 modifyAction 类型
export type HeroesGetAction = IHEROES_GETaction;
export type IndexChangeAction = IINDEX_CHANGEaction;

// 修改Hero的方法
export const getHeroes = (heroes: Hero[]): IHEROES_GETaction => ({
  type: HEROES_GET,
  payload: { heroes }
});

// 修改SelectedIndex
export const indexChange = (newIndex: number): IINDEX_CHANGEaction => ({
  type: INDEX_CHANGE,
  payload: { newIndex }
});
