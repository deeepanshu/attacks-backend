const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sanitizer = require('./src/utils/sanitizer');
const listApi = require('./src/api/list');
const loginApi = require('./src/api/login');
const con = require('./src/service/db');
const ServiceResponse = require('./src/model/ServiceResponse');


// ----------Middlewares--------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use((req, res, next) => {
  console.log(`\n ${req.method} ${req.path} \n`);
  next();
});

app.use(loginApi);
app.use(listApi);



// -------------SEEDS DB-----------------

app.get("/seed", (req, res) => {
  let createTableSql = `create table if not exists login (username varchar(20) NOT NULL, password varchar(20) NOT NULL); drop table list; create table if not exists list(item varchar(20), description varchar(20));`;
  let insertTableSql = `insert into login (username, password) values ('dj', 'dj'), ('jg', 'jg'); insert into list (item, description) values ('Item 1','Description 1'),('Item 2','Description 2');`;

  con.query(`${createTableSql}${insertTableSql}`, function(err, result) {
    if (err) throw err;
    res.json(
      new ServiceResponse({
        res: {
          result
        }
      })
    );
  });
});


// ---------Cookie Parser---------------
app.get('/cookies', (req, res) => {
  res.json({c:req.cookies, h: req.headers.cookie});
})

// ---------Input Sanitizer--------------
app.post('/san', async (req, res) => {
  console.log(req.body);
  let newBody = await sanitizer(req.body);
  res.json(newBody);
})




app.listen(5000, () => {
  console.log("Server up and running");
});
