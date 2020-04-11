const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number,
    date: Date,
    image: String,
},{timestamps: true});

module.exports = mongoose.model('Item', ItemSchema);