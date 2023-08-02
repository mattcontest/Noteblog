import { Header,Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";


export default function NoteHeader({handleLogout, user}){
    return(
        <Segment clearing>
        <Header as="h2" floated="right">
          <Link to="/">
            <Icon name="home"></Icon>
          </Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </Header>
        <Header as="h2" floated="left">
          <Link to={`/${user?.username}`}>
            <Image
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              avatar
            ></Image>
          </Link>
        </Header>
      </Segment>
    );
        
    

}