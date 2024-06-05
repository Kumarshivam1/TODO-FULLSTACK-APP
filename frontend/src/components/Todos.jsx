import { useState } from "react";

const MakeTodo = (props)=>{
    const clickHandler = async (item,getData) => {
        console.log(item);
       const response = await fetch("http://localhost:3000/completed",{
        method:"PUT",
        body:JSON.stringify({
            id:item._id
        }),
        headers:{
            "content-Type":'application/json'
        }
       })
       const data =await response.json();
       console.log(data);
       getData();
    }
    const deleteHandler = async(item,getData)=>{
        const response = await fetch("http://localhost:3000/delete",{
            method:"DELETE",
            body:JSON.stringify({
                id:item._id
            }),
            headers:{
                "content-Type":"application/json"
            }
        })
        console.log(await response.json());
        getData();
    }
    return (
        <div>
            <div>{props.items.title}</div>
            <div>{props.items.description}</div>
            <button onClick={()=>clickHandler(props.items,props.getData)}>{props.items.completed==true?'Completed':'Marks As done'}</button>
            <button onClick={()=>deleteHandler(props.items,props.getData)}>Delete</button>
            <br/>
            <hr></hr>
        </div>
    )
}

export const Todos = (props)=>{
    const todo = props.todo;
    return (
        <div>
            {todo.map((i,k)=> <MakeTodo getData={props.getData} items={i} key={i._id} />)}
        </div>
    )
}

