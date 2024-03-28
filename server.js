const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Create an in-memory database
const db = new sqlite3.Database(":memory:");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create table for form data
db.serialize(() => {
    db.run("CREATE TABLE FormData (name TEXT, email TEXT)");
});

// Middleware
app.use(express.static("public"));

// Routes
app.post("/submit-form", (req, res) => {
    const { name, email } = req.body;

    // Simple validation
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email already exists in the database
    db.get("SELECT * FROM FormData WHERE email = ?", [email], (err, row) => {
        if (err) {
            console.error("Error checking email:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        // If email exists, return error
        if (row) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // If email does not exist, insert form data into the database
        db.run(
            "INSERT INTO FormData (name, email) VALUES (?, ?)",
            [name, email],
            function(err) {
                if (err) {
                    console.error("Error saving form data:", err);
                    return res.status(500).json({ message: "Internal server error" });
                }
                res.status(201).json({ message: "Form data saved successfully" });
            },
        );
    });
});

app.get('/submissions', (req, res) => {
    const sql = `SELECT * FROM FormData`;
    db.all(sql, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch submissions' });
      }
      res.json(rows);
    });
  });
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
