const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// webフォルダの中身を公開する
app.use(express.static('public'));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myapp_michiko'
});

con.connect(function(err) {
  if (err) {
    // console.log('DB エラー');
    throw err;
  } else {
    console.log('Connected');
  }
});

// リスト
app.get('/list', function(req, res) {
  // let json = [
  //   {
  //     userId: 'userXXXX',
  //     password: 'pass1',
  //   },
  //   {
  //     userId: 'user22',
  //     password: 'pass2',
  //   },
  //   {
  //     userId: 'user33',
  //     password: 'pass3',
  //   }
  // ];

  // const sql = 'select * from tbl_users;';
  const sql = 'select user_id as userId, password from tbl_users';
  
  con.query(sql, function(err, result, fields) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });

});

app.post('/add', function(req, res) {

  // １．リクエストからjsonデータを取得。
  const userId = req.body.userId;
  const password = req.body.password;

  // ２．insertのSQL文を作成。
  // insert into tbl_users(user_id, password) values('user5', 'pass5');
  const sql = 'insert into tbl_users(user_id, password) values(?, ?)';

  // ３．SQLを実行
  con.query(sql, [userId, password], function(err, result, fields) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });

  // res.send('call POST add');

});
app.post('/update', function(req, res) {
  // res.send('call update');

  // １．リクエストからjsonデータを取得。
  const userId = req.body.userId;
  const password = req.body.password;

  // ２．updateのSQL文を作成。
  let sql = 'update tbl_users set';
  sql += ' password = ?';
  sql += ' where';
  sql += ' user_id = ?';

  console.log(sql);

  // ３．SQLを実行
  con.query(sql, [password, userId], function(err, result, fields) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });

});

app.post('/delete', function(req, res) {
  // res.send('call delete');
  
  // １．リクエストからjsonデータを取得。
  const userIds = req.body.userIds;
  let strUserIds = userIds.join('","');

  // ２．deleteのSQL文を作成。
  // let sql = 'delete from tbl_users where user_id = ?';
  let sql = 'delete from tbl_users where user_id in ("' + strUserIds + '")';

  console.log(sql);

  // ３．SQLを実行
  con.query(sql, function(err, result, fields) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });

});


app.listen(8000, 'localhost');
console.log('server listen...');

// server.listen(8000, '127.0.0.1');

// let aa = 'aa';
// const AAA = 'XX';

// let func = function() {
//   return 'Call function!'
// };

// console.log('hello world!' + aa + '/' + AAA);
// console.log(func());


