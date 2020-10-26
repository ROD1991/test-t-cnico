const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "fast1991",
  database: "dbtest",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Listar registros

app.get("/api/list", (req, res) => {
  const sqlGetlist = "SELECT * FROM regis";
    
  db.query(sqlGetlist, (err, result) => {
  
    res.send(result);
  });
  
});

// Agregar registro en bd

app.post("/api/save", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;

  const sqlInsert = "INSERT INTO regis (nombre, edad ) VALUES (?,?)";
  db.query(sqlInsert, [nombre, edad], (err, result) => {
    if (nombre && edad) {
      return res.status(201).json("registro creado");
    }
    res.status(400).json("user not created");
  });
});

// Eliminar registro en bd

app.delete("/api/delete/:nombre", (req, res) => {
  const nombre = req.params.nombre;

  const sqlDelete = "DELETE FROM regis WHERE nombre = ? ";
  db.query(sqlDelete, nombre, (err, result) => {
    if (err) console.log(result);
      return res.status(201).json("eliminado");
    
  });
});

app.listen(3001, () => {
  console.log("Server en puerto 3001");
});

module.exports = app;
