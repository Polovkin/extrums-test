import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
const authenticateToken = require('./middleware/authenticateToken');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
dotenv.config();

const indexRouter = require('./routes/index');
const authRoutes = require('./modules/auth/auth.controller');
const usersRouter = require('./modules/user/user.controller');
const countRouter = require('./modules/counter/counter.controller');

const app: Express = express();
const port = 3001;
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRoutes)
app.use('/users', authenticateToken, usersRouter);
app.use('/counter', authenticateToken, countRouter);


// Error handler middleware
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    console.error(132);
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
