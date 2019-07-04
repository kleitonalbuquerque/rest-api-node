const express = require('express')
const mysql   = require('mysql')
const morgan  = require('morgan')
const app     = express()

app.use(morgan("combined"))

app.get('/', (req, res) => {
  res.send('API run...')
})

// endpoint que busca por id
app.get('/turma/:id', (req, res) => {
  console.log('Busca turma por id', req.params.id)
  const connection = mysql.createConnection({
    host:     'localhost',
    user:     'k21',
    password: 'k21_123',
    database: 'k21_site'
  })

  const turmaId = req.params.id
  const query = 'SELECT * FROM Turma WHERE id = ?'
  connection.query(query, [turmaId], (err, results, fields) => {
   res.json(results)
  })
})

// endpoint
app.get('/turmas', (req, res) => {
  console.log('Busca turma por dataInicio', req.query.dataInicio)
  const connection = mysql.createConnection({
    host:     'localhost',
    user:     'k21',
    password: 'k21_123',
    database: 'k21_site'
  })

  const turmas = req.query.Turma
  const dataInicio = req.query.dataInicio
  const dataFim = req.query.dataFim
  const query = 'SELECT * FROM Turma WHERE dataInicio >= ? AND dataFim <= ?'
  console.log(query)
  connection.query(query, [dataInicio, dataFim], (err, results, fields) => {
   res.json(results)
  })
})

// endpoint para listar todas as turmas
// app.get('/turmas', (req, res) => {
//   console.log(req.query)
//   const connection = mysql.createConnection({
//     host:     'localhost',
//     user:     'k21',
//     password: 'k21_123',
//     database: 'k21_site'
//   })

//   const queryString = 'SELECT * FROM Turma'
//   connection.query(queryString, (err, results, fields) => {
//     res.json(results)
//    })

// })

app.listen(3003, () => {
  console.log('Server run on port http://localhost:3003')
})