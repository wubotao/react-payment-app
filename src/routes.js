import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, NotFound, Payment, Check } from './containers';
import { loadAuthIfNeeded } from './actions/auth';

const preload = promise => (nextState, replace, cb) => {
  if (__SERVER__ || nextState.location.action === 'PUSH') {
    promise().then(() => cb());
  } else {
    cb();
  }
};

export default store => {
  const authPromise = () => store.dispatch(loadAuthIfNeeded());
  return (
    <Route path="/" component={Main} onEnter={preload(authPromise)}>
      <IndexRoute component={Home}/>
      <Route path="payment" component={Payment}/>
      <Route path="check" component={Check}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
