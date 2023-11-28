"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const authenticateToken = require('./middleware/authenticateToken');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
dotenv_1.default.config();
const indexRouter = require('./routes/index');
const authRoutes = require('./modules/auth/auth.controller');
const usersRouter = require('./modules/user/user.controller');
const countRouter = require('./modules/counter/counter.controller');
const app = (0, express_1.default)();
const port = 3001;
app.use(cors());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/users', authenticateToken, usersRouter);
app.use('/counter', authenticateToken, countRouter);
// Error handler middleware
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
