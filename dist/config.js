"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongodb: {
        uri: 'mongodb://127.0.0.1:27017/my-data-base',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            poolSize: 20
        }
    },
    koa: {
        port: 8000 // Koa Http Listen Port
    },
    morgan: 'tiny' // Log Type
};
