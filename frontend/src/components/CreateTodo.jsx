import { useState } from "react"

export const CreateTodo = (props)=>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const submitHandler = async () => {
        const response = await fetch("http://localhost:3000/todo",{
            method:"POST",
            body:JSON.stringify({
                title:title,
                description:description
            }),
            headers:{
                "content-Type":"application/json"
            }
        })
        props.getData();
        console.log(JSON.stringify({title:title,description:description}));
    }
    return (
        <div>
            <h2>TODO APP</h2>
            <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} style={{padding:10}}></input> <br></br>
            <input type="text" placeholder="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} style={{padding:10}}></input> <br/>
            <button onClick={submitHandler} style={{padding:2,marginTop:8}}>Add TODO</button>
            <hr></hr>
        </div>
    )
}