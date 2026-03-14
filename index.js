const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/books', (req, res) => {
  res.send('List of books will be here')
})

app.get('/books/:id', (req, res) => {
  res.send(`Book with ID ${req.params.id} will be here`)
})


// GET
app.get('/books', (req, res) => {
  res.send('List of books will be here')
})

// GET
app.get('/books/:id', (req, res) => {
  const id = req.params.id

  res.send(`Book details for ID: ${id}`)
})

// POST
app.post('/books', (req, res) => {
  const bookName = req.body
  res.send(`Book created successfully with data: ${bookName.bookName}`)
})

// PUT
app.put('/books/:id', (req, res) => {
  const id = req.params.id
  
  res.send(`Book with ID: ${id} updated successfully`)
})

// DELETE
app.delete('/books/:id', (req, res) => {
  const id = req.params.id
  
  res.send(`Book with ID: ${id} deleted successfully`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
