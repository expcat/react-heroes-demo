import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { store } from '@/store/store';
import './index.scss';
// import Heroes from '@/heroes/heroes';
import Message from '@/message/message';
import { getHeroes } from '@/heroes/actions';
import { HEROES } from '@/model/mockheroes';
import { addMessage } from '@/message/actions';

const title = '英雄之旅';

const Dashboard = withRouter(
  lazy(() =>
    import(/* webpackChunkName: "dashboard" */ '@/dashboard/dashboard')
  )
);
const Heroes = withRouter(
  lazy(() => import(/* webpackChunkName: "heroes" */ '@/heroes/heroes'))
);
store.dispatch(getHeroes(HEROES));
store.dispatch(addMessage('获取英雄'));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <h1>{title}</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/heroes">Heroes</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect from="/" exact to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/heroes" component={Heroes} />
        </Switch>
      </Suspense>
      <Message />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
