"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var mongoose_1 = require("mongoose");
var error_handler_1 = __importDefault(require("./utils/error_handler"));
var koa_1 = __importDefault(require("koa"));
var koa2_cors_1 = __importDefault(require("koa2-cors"));
var koa_morgan_1 = __importDefault(require("koa-morgan"));
// Initialize Application
var app = new koa_1.default();
// Morgan Log
app.use(koa_morgan_1.default(config_1.default.morgan));
// Cors
app.use(koa2_cors_1.default());
// Connect To Mongo
mongoose_1.connect(config_1.default.mongodb.uri, config_1.default.mongodb.options).catch(function (e) { return console.error(e); });
app.use(error_handler_1.default);
var fruit_1 = __importDefault(require("./controllers/fruit"));
app.use(fruit_1.default.routes()).use(fruit_1.default.allowedMethods());
app.listen(config_1.default.koa.port, function () {
    console.info(new Date().toLocaleString());
    console.info('Service Loaded');
    console.info('Port', config_1.default.koa.port);
});
