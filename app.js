// const http = require('http');

// const hostname = '127.0.0.1' //localhost
// const port = 3001;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World From API')
//     res.end('Hello World From API')
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.get('/', function (req, res) {
  res.send('This should be passed to react')
})

app.get('/menu', function (req, res) {
  res.send('This should be the menu')
})

app.listen(3001)