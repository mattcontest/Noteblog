import React, { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";


export default function AddNote({handleAddNote}){
    const [state, setState] = useState({
        noteTxt: ''
    })

    const [selectedFile,setSelectedFile] = useState('');

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }


    function handleSubmit(e){
        const formData = new FormData()
        formData.append('noteTxt', state.noteTxt)
        formData.append('photo', selectedFile)
        console.log(formData.getAll('noteTxt'), "<---- FormData from AddNote")
        handleAddNote(formData);
    }


    return(
        <Segment>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Input
            className="form-control"
            name="noteTxt"
            value={state.noteTxt}
            placeholder="What's on your Note?"
            onChange={handleChange}
            required
          />
          <Form.Input
            className="form-control"
            type="file"
            name="photo"
            placeholder="upload image"
            onChange={handleFileInput}
          />
          <Button type="submit" className="btn">
            Add Note
          </Button>
        </Form>
      </Segment>


    )




}