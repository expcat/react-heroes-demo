import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Heroes from '@/heroes/heroes';
import { HEROES } from '@/model/mockheroes';

const title = '英雄之旅';
ReactDOM.render(
  <div>
    <h1>{title}</h1>
    <Heroes heroes={HEROES} />
  </div>,
  document.getElementById('root')
);
