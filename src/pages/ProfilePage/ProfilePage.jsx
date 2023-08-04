import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio"
import PostGallery from "../../components/PostGallery/PostGallery";
import Header from "../../components/Header/Header"

import userService from "../../utils/userService";

import * as notedApi from "../../utils/notedApi";

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
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header handleLogout={handleLogout} user={user}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ProfileBio user={userState} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column style={{ maxWidth: 750 }}>
              <PostGallery notes={notes} itemsPerRow={3} isProfile={true} user={user} noted={noted} removeNoted={removeNoted}/> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );






}