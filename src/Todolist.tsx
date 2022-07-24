import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    ChangeTitle:(newTitle:string,id:string,idTodolist:string)=>void
    changeNameTodolist:(idTodolist:string,title:string)=>void
}

export function Todolist(props: PropsType) {
    const[activateInput,setActivateInput] = useState<boolean>(false)

    const addTask=(title:string)=>{
        props.addTask(title,props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const ChangeNameTodolistCallback = (title:string)=> {
        props.changeNameTodolist(props.id,title)
    }

    return <div>
       <h3><EditableSpan title={props.title} onChange={ChangeNameTodolistCallback}/><button onClick={removeTodolist}>x</button></h3>

        <AddItemForm callBack={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const ChangeTitleHander = (title:string)=> {
                        props.ChangeTitle(title,t.id,props.id)
                    }
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={ChangeTitleHander}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

