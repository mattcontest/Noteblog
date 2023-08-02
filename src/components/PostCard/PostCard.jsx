import { Card, Icon, Image } from "semantic-ui-react";


export default function PostCard({ note, isProfile, noted, removeNoted, user}){

    //Check if the user has noted a specific Note
    const notedIndex = note.noted.findIndex(note => note.username === user.username);
    //If the user's username is in the noted list of the array post, its index would be returned.
    //If the username is not inside the noted list, then a -1 would be returned


    //if the user has noted one's note, the notedIndex would be greater than 1 so the color should be orange

    const notedColor = notedIndex > 1 ? 'purple' : 'black'

    //if the user has noted a post, we need to remove the noted status from it.
    //Vice versa, if the user has not noted a post and clicked on it, we then have to call our noted function
    const clickHandler = notedIndex > 1 ? () => removeNoted(note.noted[notedIndex]._id) : () => noted(note._id);


    return(
        <Card key={note._id}>
        {isProfile ? null : (
          <Card.Content textAlign="left">
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
            <Card.Header floated="right">{note.user.username}</Card.Header>
          </Card.Content>
        )}
  
        <Image src={`${note.photoUrl}`} wrapped ui={false} />
        <Card.Content>
          <Card.Description>{note.noteTxt}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
          <Icon name={"heart"} size="large" color={notedColor} onClick={clickHandler } />
          {note.noted.length} Likes
        </Card.Content>
      </Card>

    );





}