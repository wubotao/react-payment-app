import Express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from '../config';
import controllers from './controllers';

const port = config.apiPort;
const app = new Express();

app.use(bodyParser.json());

app.use(session({
  secret: 'payment',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));

controllers(app);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  API Listening on port %s. ', port);
  }
});
