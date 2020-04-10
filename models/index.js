const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb.localhost:27017/backend-closing-bells'

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

module.exports = {
    Item: require ('./Item'),
    User: require('./User')
}