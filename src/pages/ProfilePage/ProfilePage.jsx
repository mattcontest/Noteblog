import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio"
import PostGallery from "../../components/PostGallery/PostGallery";
import Header from "../../components/Header/Header"
import "./ProfilePage.css"

import userService from "../../utils/userService";

import * as notedApi from "../../utils/notedApi";
import NoteHeader from "../../components/Header/Header";

export default function ProfilePage({user, handleLogout}){
    const [notes, setNotes] = useState([]);
    const [userState, setUserState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {username} = useParams();
    console.log(username);

    async function noted(noteId){
        try {
            const response = await notedApi.create(noteId);
            getProfile(); //This helps updating the state
        
        } catch (err ) {
            setError("Error in setting Noted");
            console.log(err, "error")
            
        }
    }


    async function removeNoted(notedId){
        try {
            const response = await notedApi.removeNoted(notedId);
            getProfile(); //Updating the state
        } catch (err) {
            setError('Error in removing Noted status')
            console.log(err, "error")
            
        }
    }


    async function getProfile(){
        try {
            setLoading(true);
            const response = await userService.getProfile(username);
            console.log(response);
            setNotes(response.notes)
            setUserState(response.user)
            setLoading(false);

        } catch (err) {
            setError("Error occured while loading profile");
            console.log(err, "Error in profile")
            
        }
    }

    useEffect(() => {
        getProfile();
    }, [username]);

    if(loading){
        return(
            <>
            <Header handleLogout={handleLogout} user={user}/>
            <h1>Loading....</h1>
          </>

        )
    }


    return (


          <Grid centered >
      <Grid.Row className="grid_b">
        <Grid.Column>
          <NoteHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="grid_b">
        <Grid.Column style={{ maxWidth: 450 }}>
          <ProfileBio user={userState}/>

        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="main_bod">
        <Grid.Column style={{ maxWidth: 1050 }}>
          <PostGallery notes={notes} itemsPerRow={4} isProfile={false} noted={noted} removeNoted={removeNoted} user={user} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );





}