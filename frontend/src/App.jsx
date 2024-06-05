import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todo,setTodo] = useState([]);

  useEffect(()=>{getData()},[]);

  const getData = async ()=>{
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    console.log(data);
    setTodo(data.response);
  }

  return (
    <div>
      <CreateTodo getData={getData}/>
      <Todos todo={todo} getData={getData}/>
    </div>
  )
}

export default App
