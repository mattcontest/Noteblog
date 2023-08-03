import { Card, Icon, Image } from "semantic-ui-react";
import './PostCard.css'


export default function PostCard({ note, isProfile, noted, removeNoted, user}){

    //Check if the user has noted a specific Note
    const notedIndex = note.noted.findIndex(note => note.username === user.username);
    //If the user's username is in the noted list of the array post, its index would be returned.
    //If the username is not inside the noted list, then a -1 would be returned


    //if the user has noted one's note, the notedIndex would be greater than 1 so the color should be orange

    const notedColor = notedIndex > -1 ? 'purple' : 'black'

    //if the user has noted a post, we need to remove the noted status from it.
    //Vice versa, if the user has not noted a post and clicked on it, we then have to call our noted function
    const clickHandler = notedIndex > -1 ? () => removeNoted(note.noted[notedIndex]._id) : () => noted(note._id);


    return(

        <Card key={note._id}>

        <Card.Content>
          {/* <Card.Header floated="right">{note.user.username}</Card.Header> */}
          <Card.Meta>Posted: { new Date(note.createdAt).toLocaleDateString()}</Card.Meta>
         
        </Card.Content>
        <Image src={`${note.photoUrl}`} wrapped ui={false}  className="NoteImg"  />

        <Card.Content extra className="extra_space">
        <Card.Description>
            {note.noteTxt}
          </Card.Description>
        </Card.Content>
        {/* <Card.Content extra textAlign={"right"}>
          <Icon name={"sticky note"} size="large" color={notedColor} onClick={clickHandler } />
          {note.noted.length} Likes
        </Card.Content> */}
        {/* </Card.Content> */}
        {isProfile ? null : (
          <Card.Content textAlign="left">

          </Card.Content>
        )}
         <Card.Content extra textAlign={"left"} >

         
            <Card.Content floated="right" className="bottom_info">

            <Image
              floated="left"
              size="large"
              avatar
              src={
                  note.user.photoUrl
                  ? note.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
            />
            <Card.Content>
            By @<b>{note.user.username}</b>

            </Card.Content>

            <Card.Content>
            </Card.Content>
            <Card.Content>

            <Icon name={"sticky note"} size="large" color={notedColor} onClick={clickHandler } />
            {note.noted.length}    
            </Card.Content>

            </Card.Content>
       
        </Card.Content>
      </Card>




    //     <Card key={note._id}>
        
  
    //     <Image src={`${note.photoUrl}`} wrapped ui={false} className="NoteImg" />
    //     <Card.Content>
    //       <Card.Description>{note.noteTxt}</Card.Description>
    //     </Card.Content>
    //     <Card.Content extra textAlign={"right"}>
    //       <Icon name={"sticky note"} size="large" color={notedColor} onClick={clickHandler } />
    //       {note.noted.length} Likes
    //     </Card.Content>

        // {isProfile ? null : (
        //   <Card.Content textAlign="left">
        //     <Image
        //       floated="left"
        //       size="large"
        //       avatar
        //       src={
        //         note.user.photoUrl
        //           ? note.user.photoUrl
        //           : "https://react.semantic-ui.com/images/wireframe/square-image.png"
        //       }
        //     />
        //     <Card.Header floated="right">{note.user.username}</Card.Header>
        //   </Card.Content>
        // )}
    //   </Card>

    );





}