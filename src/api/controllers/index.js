import payment from './payment';
import check from './check';
import loadAuth from './loadAuth';

export default app => {
  loadAuth(app);
  payment(app);
  check(app);
};
