import { useEffect, useState } from "react";
import "./Feed.css"

import { Grid } from "semantic-ui-react";
// import Header from "../../components/Header/Header"
import * as noteApi from "../../utils/noteApi"
import * as notedApi from "../../utils/notedApi"
import NoteHeader from "../../components/Header/Header";
import AddNote from "../../components/AddNote/AddNote";
import PostGallery from "../../components/PostGallery/PostGallery";

export default function Feed({user, handleLogout}){
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");


    async function noted(noteId){
        try {
            const response = await notedApi.create(noteId);
            getNotes();

        } catch (err) {
            setError('Error creating like')
            console.log(err, "error")
            
        }
    }

    //To get tested
    //Delete function

    async function removeNote(noteId){
        try {
            const response = await noteApi.removeNote(noteId);
            getNotes();
        } catch (err) {
            setError("Error in Removing note");
            console.log(err, "error")
            
        }
    }


    async function removeNoted(notedId){
        try {
            const response = await notedApi.removeNoted(notedId);
            //It is not always updating the state as expcted.
            getNotes();
        } catch (err) {
            setError('Problem removing Noted');
            console.log(err, 'Error')
        }
    }
    
    
    async function handleAddNote(data){
        try {
            const responseData = await noteApi.create(data);
            console.log(responseData, "<---Response from server handleAddNote, Check here from Feed.js")
            setNotes([responseData.data, ...notes])
            console.log(responseData, "<-- Response from server in handleAddPost from Feed.js")
            console.log(notes, "<--- Notes")
        } catch (err) {
            console.log(err, "Problem in handleAddNote from Feed.js")
            setError("Problem in handleAddNote from Feed.js");
            
        }
    }
    
    
    async function getNotes(){
        try {
            const responseFromTheServer = await noteApi.getAll();
            console.log(responseFromTheServer);
            // setNotes(responseFromTheServer.notes)
            setNotes(responseFromTheServer.notes)
        } catch (err) {
            console.log(err, "err in getNotes");
            setError("Error in fetching Posts, Check terminal")
        }
    }
    
    useEffect( () => {
        getNotes()
    }, [])
    
    

        return(
            <Grid centered >
        <Grid.Row className="grid_bg">
          <Grid.Column>
            <NoteHeader handleLogout={handleLogout} user={user}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="grid_bg">
          <Grid.Column style={{ maxWidth: 450,  minWidth: 400 }}>
            <AddNote handleAddNote={handleAddNote} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="main_body">
          <Grid.Column style={{ maxWidth: 1050, minWidth: 400 }}>
            <PostGallery notes={notes} itemsPerRow={4} isProfile={false} noted={noted} removeNoted={removeNoted} user={user} removeNote={removeNote} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

}
