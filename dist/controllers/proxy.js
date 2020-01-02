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
var proxy_1 = __importDefault(require("../utils/proxy"));
var Router = require('koa-router');
var router = new Router();
router.get('/proxy/clear', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.Proxy.deleteMany({
                    timeout: { '$lt': Date.now() }
                })];
            case 1:
                count = _a.sent();
                return [2 /*return*/, json_1.default(ctx)];
        }
    });
}); });
router.get('/proxy/get', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var proxy_2, count, random, proxy, checked, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.query.proxyId) return [3 /*break*/, 2];
                return [4 /*yield*/, index_1.Proxy.findOne({
                        id: ctx.query.proxyId
                    }, { __v: 0 })];
            case 1:
                proxy_2 = _a.sent();
                if (!proxy_2)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Proxy Not Exists' })];
                return [2 /*return*/, json_1.default(ctx, {
                        data: proxy_2
                    })];
            case 2: return [4 /*yield*/, index_1.Proxy.countDocuments({
                    status: 'Alive',
                    shared: true,
                    timeout: { '$gt': Date.now() }
                })];
            case 3:
                count = _a.sent();
                if (!count)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'No Proxy' })];
                random = Math.floor(Math.random() * count);
                return [4 /*yield*/, index_1.Proxy.findOne({
                        status: 'Alive',
                        shared: true,
                        timeout: { '$gt': Date.now() }
                    }, { __v: 0 }).skip(random).exec()];
            case 4:
                proxy = _a.sent();
                checked = proxy['checked'];
                if (!((ctx.query.checkProxy ? ctx.query.checkProxy === "true" : true) &&
                    (!checked || checked < new Date(new Date().getTime() - 10 * 1000)))) return [3 /*break*/, 9];
                return [4 /*yield*/, proxy_1.default(proxy)];
            case 5:
                resp = _a.sent();
                if (!!resp) return [3 /*break*/, 7];
                return [4 /*yield*/, proxy.remove()];
            case 6:
                _a.sent();
                return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Trash Proxy, Please Retry' })];
            case 7:
                proxy['checked'] = Date.now();
                return [4 /*yield*/, proxy.save()];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, json_1.default(ctx, {
                    data: proxy
                })];
        }
    });
}); });
router.get('/proxy/ban', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var proxyId, proxy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                proxyId = ctx.query.proxyId;
                if (!proxyId)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Params Error' })];
                return [4 /*yield*/, index_1.Proxy.findOneAndUpdate({ id: proxyId }, {
                        status: 'Ban'
                    })];
            case 1:
                proxy = _a.sent();
                if (!proxy)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: "Proxy Not Found" })];
                json_1.default(ctx);
                return [2 /*return*/];
        }
    });
}); });
router.get('/proxy/set', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ip, port, user, pass, shared, timeout, proxy;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.query, ip = _a.ip, port = _a.port, user = _a.user, pass = _a.pass, shared = _a.shared;
                if (!ip || !port)
                    return [2 /*return*/, json_1.default(ctx, { success: false, msg: 'Params Error' })];
                timeout = ctx.query.timeout;
                timeout = Date.now() + (timeout ? parseInt(timeout) : 120) * 1000;
                return [4 /*yield*/, index_1.Proxy.findOneAndUpdate({
                        ip: ip,
                        port: port,
                        user: user,
                        pass: pass
                    }, {
                        timeout: timeout
                    })];
            case 1:
                proxy = _b.sent();
                if (proxy)
                    return [2 /*return*/, json_1.default(ctx, {
                            msg: "Renew Proxy",
                            proxyId: proxy['id']
                        })];
                proxy = new index_1.Proxy({ ip: ip, port: port, user: user, pass: pass, timeout: timeout, shared: shared !== "false" });
                return [4 /*yield*/, proxy.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, json_1.default(ctx, {
                        data: {
                            proxyId: proxy['id']
                        }
                    })];
        }
    });
}); });
exports.default = router;
