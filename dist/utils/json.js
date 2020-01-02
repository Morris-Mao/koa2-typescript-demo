"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (ctx, returnData) {
    if (returnData === void 0) { returnData = {}; }
    ctx.type = 'application/json';
    var newReturn = Object.assign({
        success: true,
        msg: 'ok',
        data: {}
    }, returnData);
    ctx.body = JSON.stringify(newReturn);
});
