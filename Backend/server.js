const express = require('express');
const app = express();
const PORT = 5000;

const {Client} = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200',tls: { rejectUnauthorized: false }});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require("cors");
app.use(cors());

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "BookCommunityApp"
});

db.connect(err =>{
    if (err) {
        console.error("error");
    }
    else{
        console.log("done");
    }
})

app.get('/', (req,res) =>{
    res.send('Backend is working!');
});

module.exports = db;

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = db;