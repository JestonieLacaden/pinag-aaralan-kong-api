import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useParams } from "react-router-dom";
import axios from "axios";
//import { useEffect, useState } from "react";
//import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";



const App = () => {
  /*const route = useParams();
  const [task, setTask] = useState('');
  const [cookies, setCookie] = useCookies(['taskCookie'])*/

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [auth, setAuth] = useState(false)
  const [userame, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const getTasks = () => {
    axios.get('http://localhost:3001/tasks?id=1').then((res) => {
      console.log(res);
      if(res.data.message === 'Unauthorized'){
        setAuth(false);
      }else{
        setAuth(true);
        setTasks(res.data)
      }
      setTasks(res.data)
    }).catch(err => console.error(err));
  }

  const addTasks = () =>{
    axios.post('http://localhost:3001/tasks?id=1', {task}).then(res => {
      console.log(res);
      getTasks();
    }).catch(err => console.error(err));
    setTask('')
  }

  const deleteTasks = (id) => {
    const deleteConfirm = prompt('Are you sure you want to delete this task? Type yes to continue');
    if(deleteConfirm){
      axios.delete(`http://localhost:3001/tasks/${id}`).then(res => {
      console.log(res);
      getTasks();
      }).catch(err => console.error(err));
    }
  }

  const completeTask = (id) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, {completed: true}).then((res) => {
      console.log(res);
      console.log(id);
      getTasks();
    })
  }

  const pendingTask = (id) => {
    axios.patch(`http:localhost:3001/tasks/${id}`, {completed: false}).then((res) => {
      console.log(res);
      console.log(id);
      getTasks();
    })
  }

  const login = () => {
    axios.post("http://localhost:3001/login", { userame, password }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        getTasks();
      } else {
        setAuth(false);
      }
    });
  }

  useEffect(() => {
    getTasks();
  }, [])


  return (
    <div className="App container p-4">
      <div>
        <h1>Login</h1>
        <input type="text" placeholder="Enter Username" onChange={(event) => setUsername(event.target.value)} />
        <input type="password" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} />
        <button onClick={() => login()}>Login</button>
      </div>

      <h1>Tasks</h1>
      <input type="text" placeholder="Enter task" value={task} onChange={(event) => setTask(event.target.value)} />
      <button onClick={() => addTasks()}>Add Tasks</button>
      
      {
        auth ? (<ul>
        {tasks.map((task) => ( 
          <div>
            <li key={task.id}>{task.task} - {task.completed ? 'Completed' : 'Pending'}
              <button onClick={() => deleteTasks(task.id)}>Delete</button>
            </li>
            {
              task.completed ? null : (<button onClick={() => completeTask(task.id)}>Set As Complete</button>)
            }
            {
              task.completed ? (<button onClick={() => pendingTask(task.id)}>Set As Pending</button>) : null
            }
          </div>
          ))}
      </ul>) : <h1>Unauthorized</h1>
      }
      




      {/* <div>
        <h1>weird div</h1>
        //<h1>{cookies.taskCookie}</h1>
        //<h1>{route.name}</h1>
        <img src="https://picsum.photos/200/300" alt="random"></img>
        <h2> Task List </h2>
        <ul>
          {taskList.map((task) => (
            <li>{task.task}</li>
          ))}
        </ul>
        <input type="text" value={task} placeholder="type something" onChange={(event) => setTask(event.target.value)} onKeyDownCapture={(event) => handledPress(event)}></input>
        <button className="btn btn-primary" onClick={() => sendInput()} disabled={task === '' || !task} >Click me</button>
        //<h1>{task.title}</h1>
        <h1>{task}</h1>
        //<input type="text" placeholder="Type Text Here" onChange={(event) => setTaskAndCookie(event.target.value)} />
      </div> */}
    </div>
  );
};


  // getApi();

  // const sendInput = async () => {
  //   await axios.post("http://localhost:3001/tasks", { task })
  //   setTaskList([...taskList, { task }])
  //   setTask('')
  //   console.log(task)
  // }
  // const getTask = async () => {
  //   const randomNumber = Math.floor(Math.random() * 100);
  //   await axios
  //     .get(`https://jsonplaceholder.typicode.com/todos/${randomNumber}`)
  //     .then((res) => {
  //       setTask(res.data);
  //       return res.data;
  //     });
  // }

  /*useEffect(() => {
    // getTask();
  }, {})

  const setTaskAndCookie = (value) => {
    setTask(value);
    setCookie('taskCookie', value)
  }*/

  // const handledPress = (keypress) => {
  //   if (keypress.key === "Enter") {
  //     sendInput();
  //   }
  // }

export default App;
