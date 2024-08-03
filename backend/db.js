const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/cryptoData';

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to mongoose successfully");
        })
        .catch((error) => {
            console.error("Error connecting to mongoose:", error);
        });
};

module.exports = connectToMongo;