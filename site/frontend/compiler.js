const compileHeader = (tableName,columns) => `<th><a href="#" onClick="create('${tableName}')">New</a></th><th></th>${columns.map(c => `<th>${c}</th>`).join('\n')}`;
const compileActions = (tableName,row) => `<td><a href="#" onClick="update('${tableName}',${row})">Edit</a></td><td><a href="#" onclick="delete('${tableName}',${row})">Delete</a></td>`;
const compileRow = (tableName,columns,row) => `${compileActions(tableName,row)}${columns.map(c => `<td>${row[c]}</td>`).join('\n')}`;
const compileTable = (tableName,columns,rows) => `<table border="1" cellpadding="5"><tr>${compileHeader(tableName,columns)}</tr>${rows.map(r => `<tr>${compileRow(tableName,columns,r)}</tr>`).join('\n')}</table>`;

const rows = [
    {"customer_id":"1","first_name":"Sarah","last_name":"Johnson","address":"111 Main St","phone_number":"555-555-1215"},
    {"customer_id":"2","first_name":"Michael","last_name":"Smith","address":"222 Elm St","phone_number":"555-555-1216"},
    {"customer_id":"3","first_name":"Emily","last_name":"Brown","address":"333 Oak St","phone_number":"555-555-1217"},
    {"customer_id":"4","first_name":"William","last_name":"Jones","address":"444 Main St","phone_number":"555-555-1218"},
    {"customer_id":"5","first_name":"Ashley","last_name":"Miller","address":"555 Elm St","phone_number":"555-555-1219"},
    {"customer_id":"6","first_name":"David","last_name":"Davis","address":"666 Oak St","phone_number":"555-555-1220"},
    {"customer_id":"7","first_name":"Bob","last_name":"Johnson","address":"420 Balze St","phone_number":"555-555-2222"}
    ];

const columns = Object.keys(rows[0]);

console.log(compileTable('customers',columns,rows));