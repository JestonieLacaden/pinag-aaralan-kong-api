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

//SHOULD BE ABLE TO CREATE A TASK
//SHOULD BE ABLE TO DELETE A TASK
//SHOULD BE ABLE TO MARK A TASK AS COMPLETE
//SHOULD BE ABLE TO MARK A TASK AS INCOMPLETE
//SHOULD BE ABLE TO VIEW ALL TASKS

const express = require('express')
const cors = require('cors')
const app = express()

// MiddleWare
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(cors({
//   origin: ['http://localhost:3000']
// }))

const tasks = [];
let id = 0;
const accounts = [
  {
    id: 1,
    username: 'jestonie',
    password: 'password'
  },
  {
    id: 2,
    username: 'rose',
    password: 'password'
  },
  {
    id: 3,
    username: 'rica',
    password: 'password'
  }
]

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isValid = accounts.find(account => account.username == username && account.password == password);
  if (!isValid) {
    return res.status(401).json({ message: 'LogIN Failed' })
  } else {
    res.json({ token: JSON.stringify(isValid) })
  }
})

app.get("/tasks", (req, res) => {
  const isValid = accounts.find(account => account.id == req.query.id);
  if(!isValid){
    return res.status(401).json({ message: 'Unauthorized' });
  }else{
    console.log(tasks)
    //console.log(isValid)
    res.json(tasks.filter((task) => task.user == req.query.id));
  }
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  const modefiedData = {};
  modefiedData.id = id + 1;
  modefiedData.user = req.query.id;
  id++;
  modefiedData.task = task.task
  modefiedData.completed = false;
  tasks.push(modefiedData);
  res.json(tasks);
});

app.patch('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find(task => task.id == id);
  task.completed = req.body.completed;
  res.json(tasks);
});

/*
//http://localhost:3001/?username=Jestonie (Query PATH)
app.get('/', function (req, res) {
  if (req.query.username === "Jestonie") {
    res.status(200).send("Welcome Boss Jestonie!");
  } else {
    res.status(200).send("Wrong Username");
  }
})

app.get('/menu', function (req, res) {
  res.status(200).send('This should be the Menu');
});

//http://localhost:3001/JestoniePATH (PATH use a params)
app.get('/:usernameWOW', function (req, res) {
  console.log("GET:", req.body - POST)
  if (req.params.usernameWOW === "Jes - GETtoniePATH") {
    res.status(200).send('Hello Jestonie on - PATCH PATH');
  } else {
    - DELETE
    res.status(200).send('Wrong Username on PATH');
  }
})*/

// app.get('/', function (req, res) {
//   if (req.query.username === "Jestonie") {
//     res.status(200).send('Hello World!');
//   } else {
//     res.status(401).send('Wrong Username!');
//   }
// });


//http://localhost:3001/?username=Ean


// app.get('/:username', function (req, res) {
//   console.log('GET:', req.body)
//   if (req.query.username === "Jestonie") {
//     res.status(200).send('Hello World!');
//   } else {
//     res.status(401).send('Wrong Username!');

//   }
// });

/*app.get('/:username', function (req, res) {
  console.log('POST:', req.body)
  //{name: "Jestonie"} -> 1 state
  //{loadout: "Vandal"} -> 1 state
  //{fandom: "Once"} -> 1 state
  //{os: "MacOS"} -> 1 state
  //{console: "NSwitch"} -> 1 state per instance of request
  res.send("Check data in logs")
});*/

// app.post("/:usernamePOST", function (req, res) {
//   console.log("POST:", req.body)
//   res.send('Check data in logs')
// })

// app.get('*', function (req, res) {
//   res.send('Page not Found 404 Error');
// });

const port = 3001;

app.listen(port, () => {
  console.log("Listening on port:", port)
})


//RESTful API
// C - Create - POST
// R - Read - GET
// U - Update - PATCH
// D - Delete - DELETE
// E - Edit

