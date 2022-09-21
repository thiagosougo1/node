const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pageqtd = req.body.pageqtd;
  const query = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ["title", "pageqtd", title, pageqtd];

  pool.query(query, data, function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sql = "Select * FROM books";

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqtd = req.body.pageqtd;
  const sql = `UPDATE books SET title = '${title}', pageqtd = '${pageqtd}' WHERE id = ${id}`;

  pool.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${id}`;

  pool.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/books");
  });
});

app.listen(3001);
