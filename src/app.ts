import config from './config';
import { connect as MongoConnect } from 'mongoose';
import errorHandler from './utils/error_handler'

import Koa from 'koa';
import koaCors from 'koa2-cors';
import koaMorgan from 'koa-morgan';

// Initialize Application
const app = new Koa();
// Morgan Log
app.use(koaMorgan(config.morgan));
// Cors
app.use(koaCors());
// Connect To Mongo
MongoConnect(config.mongodb.uri, config.mongodb.options).catch((e) => console.error(e));
app.use(errorHandler);

import fruitRouter from './controllers/fruit';
app.use(fruitRouter.routes()).use(fruitRouter.allowedMethods());

app.listen(config.koa.port, () => {
    console.info(new Date().toLocaleString());
    console.info('Service Loaded');
    console.info('Port', config.koa.port)
});
