import { Hero } from '@/model/hero';
import axios, { AxiosResponse } from 'axios';

export const getHeroes = (): Promise<AxiosResponse<Hero[]>> => {
  return axios.get<Hero[]>('/api/heroes');
};

export const addHero = (hero: Hero): Promise<AxiosResponse<Hero>> => {
  return axios.post<Hero>('/api/heroes', hero);
};

export const delHero = (id: number): Promise<AxiosResponse<string>> => {
  return axios.delete<string>('/api/heroes/' + id);
};
