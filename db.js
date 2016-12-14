var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'map',
  user: 'root',
  password: ''
});

connection.connect();

connection.query('SELECT * FROM types', function (err, rows) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

connection.end();