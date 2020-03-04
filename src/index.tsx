import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { store } from '@/store/store';
import './index.scss';
import Message from '@/message/message';
import { environment } from '@/environment/environment';
import { addMessage } from './message/actions';

if (environment.mock) {
  require('@/mock/mock');
}

const title = '英雄之旅';

const Dashboard = withRouter(
  lazy(() =>
    import(/* webpackChunkName: "dashboard" */ '@/dashboard/dashboard')
  )
);
const Heroes = withRouter(
  lazy(() => import(/* webpackChunkName: "heroes" */ '@/heroes/heroes'))
);

const HeroDetail = withRouter(
  lazy(() =>
    import(/* webpackChunkName: "hero-detail" */ '@/hero-detail/hero-detail')
  )
);

store.dispatch(addMessage('初始化'));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <h1>{title}</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/heroes">Heroes</Link>
      </nav>
      <Suspense fallback={<div>加载中...</div>}>
        <Switch>
          <Redirect from="/" exact to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/heroes" component={Heroes} />
          <Route path="/detail/:id" component={HeroDetail} />
        </Switch>
      </Suspense>
      <Message />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
