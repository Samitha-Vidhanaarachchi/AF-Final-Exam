const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = 4000;
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:500000}));

mongoose.connect("mongodb+srv://admin:admin@cluster0-8wjef.mongodb.net/iLearning?retryWrites=true&w=majority", {useNewUrlParser: true});
const connection = mongoose.connection;


connection.once('open', function () {
    console.log('mongoDB database Connections extablished Successfully')
});

//start the server using express
app.listen(PORT, function () {
    console.log("Server is running on PORT: " + PORT);
});

const userDetail = require('./Routes/user.server.route');
 const adminDetail = require('./Routes/lecture.server.route');
app.use('/api/userDetail',userDetail);
 app.use('/api/adminDetail',adminDetail);