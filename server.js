const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON in the request body

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "new_schema",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/", (req, res) => {
  return res.json("from backend side");
});

app.post("/users", (req, res) => {
  const { companyName, price, category, subCategory, ProductDetails } = req.body;
console.log(companyName, price, category, subCategory, ProductDetails);
  // const id = "1367357";

  const sql = `INSERT INTO new_table (companyName, price, category, subCategory, ProductDetails) VALUES 
  ("${companyName}", "${price}", "${category}", "${subCategory}", "${ProductDetails}");  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data inserted successfully!");
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});


app.get("/users", (req, res) => {
  const sql = "SELECT * FROM new_table"; // Replace 'new_table' with your actual table name
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // console.log(data);
    return res.json(data);
  });
});

app.delete("/users/:id",(req,res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM new_table WHERE id = ?'
  db.query(sql,[id], (err, result) => {
    if(err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });    
    }
    console.log('Data deleted successfully!');
    return res.status(200).json({ message: 'Data deleted successfully' });
  })
  
})

// Add this endpoint to handle PUT requests for updating data
app.put("/users/:id", (req, res) => {
  const productId = req.params.id;
  const { companyName, price, category, subCategory, ProductDetails } = req.body;

  const sql = ` UPDATE new_table SET companyName = ?, price = ?, category = ?, subCategory = ?, ProductDetails = ? WHERE id = ?`;
  db.query(
    sql,
    [companyName, price, category, subCategory, ProductDetails, productId],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Data updated successfully!");
      return res.status(200).json({ message: "Data updated successfully" });
    }
  );
});



app.listen(5051, () => {
  console.log("server start");
});
