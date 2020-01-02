import { Schema, model } from 'mongoose';

const Fruit = new Schema({
    name: String
}, {collection: 'fruits'});

export default model('Fruit', Fruit);
