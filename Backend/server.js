const express = require('express');
const app = express();
const PORT = 5000;
const mysql = require('mysql2');
const {Client} = require('@elastic/elasticsearch');

const esClient = new Client({ node: 'http://localhost:9200',tls: { rejectUnauthorized: false }});


app.use(express.json());
const cors = require("cors");
app.use(cors());

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

app.post('/signup', (req,res) =>{
    const{name, email, password} = req.body;
    const checkUserQuery = "SELECT * from users WHERE name = ?";
    db.query(checkUserQuery, [name], (err,result) =>{
        if(err){
            console.error("Database error:", err);
            return;
        }
        if(result.length > 0){
            return res.status(400).json({success: false, message: "Username already taken"});
        }
    });
    const insertUserQuery = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    db.query(insertUserQuery, [name, email, password], (err) => {
        if(err){
            console.error("error", err.message);
            return res.status(500).json({ success: false, message: "Signup failed" });
        }
        res.json({ success: true, message: "Signup successful" });
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/suggest', async (req, res) => {
    const query = req.query.q || '';
    console.log("Received query:", query);

    try {
        const response = await esClient.search({
            index: 'books',
            body: {
                suggest: {
                    book_suggest: {
                        prefix: query,
                        completion: {
                            field: 'suggest',
                            size: 5,
                            fuzzy: {
                                fuzziness: "auto"
                            }
                        }
                    }
                }
            }
        });
        console.log("Elasticsearch response:", response);
        const suggestions = [...new Set(response.suggest?.book_suggest?.[0]?.options?.map(opt => opt.text) || [])];
        res.json(suggestions);
    } catch (err) {
        console.error('💥 Elasticsearch error:', err);
        res.status(500).json({ error: 'Suggestion failed' });
    }
});
