const express = require('express');
const app = express();
app.disable('x-powered-by');
const movies = require('./movies.json');

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    
})

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})