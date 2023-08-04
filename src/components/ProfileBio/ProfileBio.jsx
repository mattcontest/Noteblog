import {  Image, Grid, Segment } from 'semantic-ui-react';
import "./ProfileBio.css"



export default function ProfileBio({user}){
    return(
        <Grid textAlign='center'  id="changas"columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image className='profile_bio' src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
          </Grid.Column>
          <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
            <Segment vertical>
               <h3>{user.username}</h3>
            </Segment>
            <Segment>
               <span> Bio: {user.bio}</span>
            </Segment>
              
          </Grid.Column>
        </Grid.Row>
      </Grid>
        
    );
}