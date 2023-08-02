import { useEffect, useState } from "react";

import { Grid } from "semantic-ui-react";
// import Header from "../../components/Header/Header"
import * as notesApi from "../../utils/noteApi"
import * as notedApi from "../../utils/notedApi"
import NoteHeader from "../../components/Header/Header";
import AddNote from "../../components/AddNote/AddNote";
import PostGallery from "../../components/PostGallery/PostGallery";

export default function Feed({user, handleLogout}){
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");


    async function noted(noteId){
        try {
            const response = await notesApi.create(noteId);
            getNotes();

        } catch (err) {
            setError('Error creating like')
            console.log(err, "error")
            
        }
    }


    async function removeNoted(notedId){
        try {
            const response = await notedApi.removeNoted(notedId);
            getNotes();
        } catch (err) {
            setError('Problem removing Noted');
            console.log(err, 'Error')
        }
    }
    
    
    async function handleAddNote(data){
        console.log(data, "Check here from Feed.js")
        try {
            const responseData = await notesApi.create(data);
            setNotes([responseData.data, ...notes])
            console.log(responseData, "<-- Response from server in handleAddPost from Feed.js")
        } catch (err) {
            console.log(err, "Problem in handleAddNote from Feed.js")
            setError("Problem in handleAddNote from Feed.js");
            
        }
    }
    
    
    async function getNotes(){
        try {
            const responseFromTheServer = await notesApi.getAll();
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
        <Grid centered>
    <Grid.Row>
      <Grid.Column>
        <NoteHeader handleLogout={handleLogout} user={user}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
        <AddNote handleAddNote={handleAddNote} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
        <PostGallery notes={notes} itemsPerRow={1} isProfile={false} noted={noted} removeNoted={removeNoted} user={user} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

}
