const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root',
  database: 'booking_system'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});


app.get('/bookings', (req, res) => {
  const sql = 'SELECT * FROM bookings';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});


app.post('/bookings', (req, res) => {
  const { customer_name, phone_number, check_in_date, check_out_date } = req.body;
  const sql = 'INSERT INTO bookings (customer_name, phone_number, check_in_date, check_out_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [customer_name, phone_number, check_in_date, check_out_date], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, message: 'Booking created successfully!' });
    }
  });
});


app.put('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { customer_name, phone_number, check_in_date, check_out_date } = req.body;
  const sql = 'UPDATE bookings SET customer_name = ?, phone_number = ?, check_in_date = ?, check_out_date = ? WHERE id = ?';
  db.query(sql, [customer_name, phone_number, check_in_date, check_out_date, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Booking not found!' });
    } else {
      res.json({ message: 'Booking updated successfully!' });
    }
  });
});


app.delete('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Booking not found!' });
    } else {
      res.json({ message: 'Booking deleted successfully!' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});