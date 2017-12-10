require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import fs from 'fs';
import flash from 'connect-flash';
import session from 'express-session';
import cors from 'cors';
import routes from './app/routes';
import initPassport from './app/passport/passport-init';
import path from 'path';
import favicon from 'serve-favicon';
const app = express();

mongoose.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
mongoose.Promise = global.Promise;

app.use(favicon(path.join(__dirname, '/favicon.png')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(
  session({
    secret: 'passport',
    resave: false,
    saveUnitialized: false
  })
);
app.use(passport.initialize());
app.use(flash());

app.use(cors());

app.use('/', routes);

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

initPassport(passport);

const port = process.env.PORT;
app.listen(port);

export default app;