import express from 'express';
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import {connectDB} from "./db/db.js";
import method_override from 'method-override';
import loadUserMiddleware from "./middlewares/loadUser.middleware.js";
import dateFilter from "nunjucks-date-filter";
import {categories, dreamStatus, PORT} from "./utils.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import adminMiddleware from "./middlewares/admin.middleware.js";
import session from "express-session";
import loadFlashMessage from "./middlewares/loadFlashMessage.js";
import adminRoutes from "./routes/admin.routes.js";
import publicRoutes from "./routes/public.routes.js";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());

// utils
app.locals.categories = categories;
app.locals.dreamStatus = dreamStatus;

let env = nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});
env.addFilter('date', dateFilter);

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(method_override('_method'));

await connectDB();
//mongoose.set('debug', true);

app.use(loadUserMiddleware);
app.use(loadFlashMessage);

// public module
app.use(publicRoutes);
// end: public module

// admin module
app.use('/admin', authMiddleware, adminMiddleware);
app.use('/admin', adminRoutes);
// end: admin module

app.use((req, res, next) => {
    res.status(404);
    res.send('Stránka nenalezena')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Něco se nepovedlo :(');
});

export default app;