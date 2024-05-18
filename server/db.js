import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sql@1234#',
    database: 'pharmacydb'

})