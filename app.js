const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json);


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'strona'
});

db.connect((err) => {
  if (!err) {
    console.log('DB connection succeded.');
  } else {
    console.log('DB connection failed \n Error' + JSON.stringify(err, undefined, 2));
  }
});


app.get('/wyniki',(req, res)=>{
  db.query('SELECT * FROM wyniki',(err, rows, fields)=>{
    if (!err) {
      res.send(rows);
    }
    else{ 
      console.log(err);
    }
  })
});


app.get('/sportowiec', function(req, res, next){
      db.query("SELECT * FROM sportowiec", function (err, result, fields) {
        if (err) throw err;
        res.json({
          'status': result
        });
      });
    });

app.listen(8080,()=>console.log('Server is running at port 8080'));