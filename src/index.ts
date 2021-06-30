import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

import database from './config/database';
import envConfig from './env';
import router from './core/index';

const ROOT_DIR = process.cwd();
const PUBLIC_PATH = join(ROOT_DIR, 'public');
const VIEW_PATH = join(ROOT_DIR, 'views');

const app = express();

database();

app.set('view engine', 'pug');
app.set('views', VIEW_PATH);

app.use(cookieParser(envConfig.COOKIE_SECRET));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  if (req.body._method) {
    req.method = req.body._method_method;
  }

  next();
});

app.use(
  express.static(PUBLIC_PATH, {
    etag: true,
    cacheControl: true,
    maxAge: 8000,
  })
);

app.use('/', router);

app.listen(envConfig.PORT, () => {
  console.log(`Server is listening on ${envConfig.PORT}`);
});
