import { Hero } from '@/model/hero';
import axios, { AxiosResponse } from 'axios';

export const searchHeroes = (name: string): Promise<AxiosResponse<Hero[]>> => {
  return axios.get<Hero[]>('/api/heroes/?name=' + name);
};
