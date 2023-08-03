// import { Header,Segment, Image, Icon } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import './Header.css'
// import { Component } from "react";


// export default function NoteHeader({handleLogout, user}){
//   console.log(user, "Checking the user from Header");

//     return(
//         <Segment clearing>
//         <Header as="h2" floated="right">
//           <Link to="/">
//             <Icon name="home"></Icon>
//           </Link>
//           <Link to="/" onClick={handleLogout}>
//             Logout
//           </Link>
//         </Header>
//         <Header as="h2" floated="left">
//           <Link to={`/${user?.username}`}>
//             <Image
//               src={
//                 user?.photoUrl
//                   ? user?.photoUrl
//                   : "https://react.semantic-ui.com/images/wireframe/square-image.png"
//               }
//               avatar
//             ></Image>
//           </Link>
//         </Header>
//       </Segment>
//     );
  
//     }

import React, { Component } from 'react'
import { Button, Dropdown, Menu, Image} from 'semantic-ui-react'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './Header.css'

export default class NoteHeader extends Component {
  state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  
  render() {
    // const { activeItem } = this.state
    const {handleLogout} = this.props;
    const {user} = this.props;
 

    return (
      <Menu size='massive'>
        <Menu.Item
          name='home'>
             <Link to={`/${user?.username}`}>
            <Image id='avatar'
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              avatar
            ></Image>

             </Link>

            </Menu.Item>


        {/* <Menu.Item
          name='messages'
          // active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        /> */}

    <Menu.Item className='my_notes'>
        <Link to={`/${user?.username}`}>
            <h1 id="mynotes">@</h1>
          </Link>
          
           </Menu.Item>





        <Menu.Menu className='right menu'>
        <Link to={`/${user?.username}`}>
            <h1 id="logo">Noteblog</h1>
          </Link>
          
           </Menu.Menu>



        <Menu.Menu position='right'>


          
          <Menu.Item>
            <Button primary onClick={handleLogout}>Log out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
