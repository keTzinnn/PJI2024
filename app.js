const express = require("express");
const app = express();
const port = 3030;
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:postgres@localhost:5433/pds");
app.use(express.json());

// HELLO WORLD!
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ROTAS
// SERVER 01 - TABELA turma
const IP_1 = `172.16.221.204`
const PORT_1 = 3000
const SERVER_1 = [IP_1,PORT_1].join(':');
var server1 = require('axios').create({
  baseURL: 'http://' + SERVER_1
})
// SERVER 02 - TABELA instrutores
const IP_2 = `172.16.221.33`
const PORT_2 = 3030
const SERVER_2 = [IP_2,PORT_2].join(':');
var server2 = require('axios').create({
  baseURL: 'http://' + SERVER_2
})
// SERVER 03
const IP_3 = `172.16.222.233`
const PORT_3 = 3001
const SERVER_3 = [IP_3,PORT_3].join(':');
var server3 = require('axios').create({
  baseURL: 'http://' + SERVER_3
})
// SERVER 04
const IP_4 = `172.16.220.238`
const PORT_4 = 3000
const SERVER_4 = [IP_4,PORT_4].join(':');
var server4 = require('axios').create({
  baseURL: 'http://' + SERVER_4
})
// SERVER 05
const IP_5 = `172.16.221.155`
const PORT_5 = 3080
const SERVER_5 = [IP_5,PORT_5].join(':');
var server5 = require('axios').create({
  baseURL: 'http://' + SERVER_5
})

// TABELA aulas
// GET
app.get('/aulas', async (req, res) => {
  try {
    const { data } = await server1.get('/aulas')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})
// TABELA competencias
// GET
app.get('/competencias', async (req, res) => {
  try {
    const { data } = await server4.get('/competencias')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

// TABELA turma
// GET
app.get('/turmas', async (req, res) => {
  try {
    const { data } = await server1.get('/turmas')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

// TABELA suspensoes
// GET
app.get('/suspensoes', async (req, res) => {
  try {
    const { data } = await server5.get('/suspensoes')
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

// TABELA instrutores
// GET
app.get("/instrutores", (req, res) => {
  db.any("SELECT * FROM instrutores")
    .then((data) => {
      res.json({ status: "success", data: data });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao recuperar instrutores." });
    });
});
// POST ID
app.post("/instrutores", (req, res) => {
  const { id_instrutor, matricula, nome_completo } = req.body;
  db.none(
    "INSERT INTO instrutores(id_instrutor, matricula, nome_completo) VALUES($1, $2, $3)",
    [id_instrutor, matricula, nome_completo]
  )
    .then(() => {
      res.json({ status: "success", message: "Instrutor adicionado com sucesso." });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao adicionar instrutor." });
    });
});
// PUT ID
app.put("/instrutores/:id", (req, res) => {
  const id_instrutor = req.params.id;
  const { matricula, nome_completo } = req.body;
  console.log("Received data:", matricula, nome_completo); // Add this line for debugging
  db.none(
    "UPDATE instrutores SET matricula = $1, nome_completo = $2 WHERE id_instrutor = $3",
    [matricula, nome_completo, id_instrutor]
  )
    .then(() => {
      res.json({ status: "success", message: "Instrutor atualizado com sucesso." });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao atualizar instrutor." });
    });
});
// DELETE ID
app.delete("/instrutores/:id", (req, res) => {
  const id_instrutor = req.params.id;
  db.none("DELETE FROM instrutores WHERE id_instrutor = $1", [id_instrutor])
    .then(() => {
      res.json({ status: "success", message: "Instrutor excluído com sucesso." });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).json({ status: "error", message: "Erro ao excluir instrutor." });
    });
});


// Demais rotas...

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
