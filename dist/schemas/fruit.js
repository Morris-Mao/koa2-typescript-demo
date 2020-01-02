"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Fruit = new mongoose_1.Schema({
    name: String
}, { collection: 'fruits' });
exports.default = mongoose_1.model('Fruit', Fruit);
