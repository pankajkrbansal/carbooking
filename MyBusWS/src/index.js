const express = require('express');
const cors = require('cors');
const app = express();
const create = require("./model/dbsetup");
const router = require("./routes/routing");
const bodyParser = require('body-parser');
const myRequestLogger = require("./utilities/requestLogger");
const myErrorLogger = require("./utilities/errorLogger");
app.use(cors());
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use("/",router);
app.use(myErrorLogger);



app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data);
    }).catch((error) => {
        next(error);
    })
})

app.listen(3000);
console.log("Server is listening in the port : 3000");

module.exports=app;