var express = require('express')
      app = express();
      bodyParser = require('body-parser');
      routes = require('./routes/index');
      cors = require('cors');
      session = require('express-session');
require('dotenv').config();

    
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "$2a$10$/uSGUFAHATPZlbpHIqSNJu",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge : 60000}
}));

app.get('/', (req, res) => {
    res.json("Welcome");
});

app.use('/api',routes);

app.listen(port, () => {
    console.log(`Server started on port ` + port);
});