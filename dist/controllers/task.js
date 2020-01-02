"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../schemas/index");
var json_1 = __importDefault(require("../utils/json"));
var client_1 = require("../utils/client");
var Router = require('koa-router');
var router = new Router();
// 提取一个任务
router.get('/task/get', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientId = ctx.query.clientId;
                if (!clientId)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Missing Params' })];
                return [4 /*yield*/, index_1.Task.findOneAndUpdate({
                        status: 'Waiting'
                    }, {
                        status: 'Working'
                    })];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'No Task' })];
                return [4 /*yield*/, client_1.setStatus(clientId, 'Working')];
            case 2:
                _a.sent();
                json_1.default(ctx, {
                    data: {
                        taskId: result['id'],
                        proxyId: result['proxyId'],
                        siteKey: result['siteKey'],
                        siteReferer: result['siteReferer']
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
// 返回识别结果
router.get('/task/set', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, taskId, status, response, cookie, reason, clientId, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.query, taskId = _a.taskId, status = _a.status, response = _a.response, cookie = _a.cookie, reason = _a.reason, clientId = _a.clientId;
                if (!taskId || !status || !clientId)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Missing Params' })];
                if (!['Success', 'Fail'].includes(status))
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Status Error' })];
                return [4 /*yield*/, client_1.setStatus(clientId)];
            case 1:
                _b.sent();
                return [4 /*yield*/, index_1.Task.findOneAndUpdate({
                        id: taskId
                    }, {
                        response: response,
                        cookie: cookie,
                        status: status,
                        reason: reason,
                        finished: Date.now()
                    })];
            case 2:
                result = _b.sent();
                if (!result)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'No Task' })];
                json_1.default(ctx, {
                    data: {
                        taskId: result['id'],
                        status: status
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
// 创建任务
router.get('/task/create', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, siteKey, siteReferer, proxyId, task;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.query, siteKey = _a.siteKey, siteReferer = _a.siteReferer, proxyId = _a.proxyId;
                if (!siteKey || !siteReferer)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Missing Params' })];
                task = new index_1.Task({
                    siteKey: siteKey,
                    siteReferer: siteReferer,
                    proxyId: proxyId
                });
                return [4 /*yield*/, task.save()];
            case 1:
                _b.sent();
                json_1.default(ctx, {
                    data: {
                        taskId: task.id
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
// 获取任务状态
router.get('/task/status', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = ctx.query.taskId;
                if (!taskId)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Missing Params' })];
                return [4 /*yield*/, index_1.Task.findOne({
                        id: taskId
                    }, { _id: 0, __v: 0 })];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Not Exists' })];
                json_1.default(ctx, {
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
// 销毁任务
router.get('/task/destroy', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = ctx.query.taskId;
                if (!taskId)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Missing Params' })];
                return [4 /*yield*/, index_1.Task.findOneAndRemove({
                        id: taskId
                    })];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Not Exists' })];
                json_1.default(ctx);
                return [2 /*return*/];
        }
    });
}); });
// 任务状态
router.get('/task/info', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var amount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.Task.find({
                    status: 'Waiting'
                }).count()];
            case 1:
                amount = _a.sent();
                json_1.default(ctx, {
                    data: {
                        waiting: amount
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
