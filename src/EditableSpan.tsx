import React, {ChangeEvent, useState} from "react";

export type EditableSpanTypeProps = {
    title: string
    onChange:(newTitle:string)=>void
}
export const EditableSpan = (props: EditableSpanTypeProps) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.onChange(title)


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }



    return <span onDoubleClick={onDoubleClickHandler}>{editMode ?
        <input autoFocus value={title} onChange={onChangeHandler} onBlur={onBlurHandler}/> : props.title}</span>
}