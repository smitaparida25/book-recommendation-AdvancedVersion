const mysql = require('mysql2');
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({ node: 'http://localhost:9200',tls: { rejectUnauthorized: false }});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "BookCommunityApp"
});

async function syncBooksToEs() {
  try {
    // Create index if it doesn't exist
    const indexExists = await esClient.indices.exists({ index: 'books' });
    if (!indexExists) {
      await esClient.indices.create({
        index: 'books',
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              authors: { type: 'text' },
              description: { type: 'text' },
              published_date: { type: 'keyword' },
              thumbnail: { type: 'keyword' },
              suggest: { type: 'completion' }
            }
          }
        }
      });
      console.log("✅ Elasticsearch index created.");
    }

    db.query("SELECT * FROM books", async (err, results) => {
      if (err) {
        console.error("❌ MySQL query error:", err);
        return;
      }

      for (let book of results) {
        try {
          const suggestInput = [];

          if (book.title) suggestInput.push(book.title);
          if (book.authors) suggestInput.push(...book.authors.split(',').map(a => a.trim()));

          await esClient.index({
            index: 'books',
            id: book.google_id,
            body: {
              title: book.title,
              authors: book.authors,
              description: book.description,
              published_date: book.published_date,
              thumbnail: book.thumbnail,
              suggest: {
                input: suggestInput
              }
            }
          });

          console.log(`Indexed: ${book.title}`);
        } catch (indexErr) {
          console.error(`Error indexing ${book.google_id}:`, indexErr?.meta?.body?.error || indexErr);
        }
      }

      db.end(); // Close connection after all books are processed
      console.log("Sync complete. MySQL connection closed.");
    });

  } catch (e) {
    console.error(" Top-level error:", e);
  }
}

syncBooksToEs();
