const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql.createConnection(config);
connection.query(`create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))`);
connection.query(`INSERT INTO people (name) VALUES ('joe')`);
connection.end();

const getAll = (callback) => {
    const connection = mysql.createConnection(config);

    connection.query('SELECT name FROM people', (err, result) => {
        if (err) {
            return callback(err);
        }

        const listOfNames = result.map(entry => `<li>${entry.name}</li>`).join('\n');
        callback(null, `
            <h1>Full Cycle Rocks!</h1>
            <h3>List of people</h3>
            <ul>
                ${listOfNames}
            </ul>
        `);
    });

    connection.end(); 
};

app.get('/', (req, res) => {
    getAll((err, listOfNames) => {
        if (err) {
            return res.status(500).send('Erro buscando os nomes');
        }
        res.send(listOfNames);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});