import { Hero } from '@/model/hero';
import axios, { AxiosResponse } from 'axios';

export const modifyHero = (hero: Hero): Promise<AxiosResponse<string>> => {
  return axios.put<string>('/api/heroes', hero);
};

export const getHero = (id: number): Promise<AxiosResponse<Hero>> => {
  return axios.get<Hero>('/api/heroes/' + id);
};
