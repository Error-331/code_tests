# General

## MYSQL package - issue with execute/query

Link: `https://github.com/sidorares/node-mysql2/issues/153`;

sidorares: `If you want the result to be identical to original 8byte IEEE double without to/from string precision loss you can use binary protocol (execute instead of query):`

```javascript

var connection = require('./test/common.js').createConnection();
connection.query("create temporary table dtest (c double unsigned)");
connection.query("insert into dtest set c=0.27890624999999997");
connection.query("SELECT c FROM dtest", function (err, rows, cols) {
    console.log(rows[0].c);
});
connection.execute("SELECT c FROM dtest", function (err, rows, cols) {
    console.log(rows[0].c);
    connection.end();
});

```

Output: 

```text

0.27890625
0.27890624999999997

```
