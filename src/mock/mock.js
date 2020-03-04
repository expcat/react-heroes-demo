import Mock from 'mockjs';
import { HEROES } from '@/model/mockheroes';

// const heroes = HEROES;

Mock.mock('/api/heroes', 'get', () => {
  return HEROES;
});

Mock.mock('/api/heroes', 'put', (options) => {
  // console.log(options);
  const hero = JSON.parse(options.body);
  const index = HEROES.findIndex((h) => h.id === hero.id);
  if (index > -1) {
    HEROES[index] = hero;
  }
  return 'ok';
});

Mock.mock('/api/heroes', 'post', (options) => {
  // console.log(options);
  const hero = JSON.parse(options.body);
  hero.id =
    HEROES.length > 0 ? Math.max(...HEROES.map((hero) => hero.id)) + 1 : 11;
  HEROES.push(hero);
  return hero;
});

const getHeroUrl = '/api/heroes/';
Mock.mock(RegExp(getHeroUrl + '\\d'), 'get', (options) => {
  const id = +options.url.replace(getHeroUrl, '');
  const index = HEROES.findIndex((hero) => hero.id === id);
  if (index > -1) {
    return HEROES[index];
  }
  return null;
});

Mock.mock(RegExp(getHeroUrl + '\\d'), 'delete', (options) => {
  const id = +options.url.replace(getHeroUrl, '');
  const index = HEROES.findIndex((hero) => hero.id === id);
  if (index > -1) {
    HEROES.splice(index, 1);
  }
  return 'ok';
});

const searchParam = 'name=';
Mock.mock(
  RegExp(getHeroUrl + '\\?' + searchParam + '\\w'),
  'get',
  (options) => {
    console.log(options);
    const name = options.url.replace(getHeroUrl + '?' + searchParam, '');
    console.log(name);
    return HEROES.filter((h) => h.name.includes(name));
  }
);
