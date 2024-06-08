import express from 'express';
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import {connectDB} from "./db/db.js";
import dreamsRoutes from "./routes/public/dreams.routes.js";
import method_override from 'method-override';
import loadUserMiddleware from "./middlewares/loadUser.middleware.js";
import usersRoutes from "./routes/public/users.routes.js";
import dateFilter from "nunjucks-date-filter";
import mongoose from "mongoose";
import {categories, dreamStatus} from "./utils.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import adminMiddleware from "./middlewares/admin.middleware.js";
import dreamsAdminRoutes from "./routes/admin/dreams.admin.routes.js";
import usersAdminRoutes from "./routes/admin/users.admin.routes.js";
import session from "express-session";
import loadFlashMessage from "./middlewares/loadFlashMessage.js";
import paypal_testRoutes from "./routes/paypal_test.routes.js";
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
mongoose.set('debug', true);

app.use(loadUserMiddleware);
app.use(loadFlashMessage);

// public module
app.use(publicRoutes);
// end: public module

// admin module
app.use('/admin', authMiddleware, adminMiddleware);
app.use('/admin', adminRoutes);
// end: admin module

app.use(paypal_testRoutes)

app.use((req, res, next) => {
    res.status(404);
    res.send('Stránka nenalezena')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Něco se nepovedlo :(');
});

export default app;