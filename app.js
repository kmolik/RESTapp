const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());


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


app.get('/scores',(req, res, next)=>{
  db.query('SELECT * FROM wyniki',(err, result, fields)=>{
    if (!err) {
      res.send(result);
    }
    else{ 
      console.log(err);
    }
  })
});

app.get('/contestant', (req, res, next) => {
      db.query('SELECT * FROM sportowiec', (err, result, fields) => {
        if (!err){
          res.send(result);
        }
        else{
          console.log(err);
        }
      })
    });

    app.get('/contestant/:id', (req, res, next) => {
      db.query('SELECT * FROM sportowiec WHERE id = ?',[req.params.id], (err, result, fields) => {
        if (!err){
          res.send(result);
        }
        else{
          console.log(err);
        }
      })
    });

    app.delete('/contestant/:id', (req, res, next) => {
      db.query('DELETE FROM sportowiec WHERE id = ?',[req.params.id], (err, result, fields) => {
        if (!err){
          res.send('Deleted successfully.')
        }
        else{
          console.log(err);
        }
      })
    });
/*
    app.insert('/contestant/:id', (req, res, next) => {
      db.query('DELETE FROM sportowiec WHERE id = ?',[req.params.id], (err, result, fields) => {
        if (!err){
          res.send('Deleted successfully.')
        }
        else{
          console.log(err);
        }
      })
    });
*/

app.listen(8080,()=>console.log('Server is running at port 8080'));