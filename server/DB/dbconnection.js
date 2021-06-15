const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hoteldb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true
})
.then(con => {
    console.log("mongodb connected");
})
.catch(err => {
    console.log("Error" + err.message);
});

const db = mongoose.connection;

module.exports = db;