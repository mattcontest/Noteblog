
import React, { Component } from 'react'
import { Button, Dropdown, Menu, Image, Icon} from 'semantic-ui-react'
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
             {/* <Link to={`/${user?.username}`}> */}
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




    {/* <Menu.Item className='my_notes'>
        <Link to={`/${user?.username}`}> */}
            {/* <h1 id="mynotes">@</h1> */}

              {/* <Icon name='user' size='big'/> */}
{/* 
          </Link>
          
           </Menu.Item>
     */}
    <Menu.Item>
      <Link to ={`/bookmark`}>
        <Icon name='bookmark' size='big'/>
      </Link>

    </Menu.Item>

    <Menu.Item>
      <Link to ={`/inbox`}>
        <Icon name='inbox' size='big'/>
      </Link>

    </Menu.Item>





        <Menu.Menu className='right menu'>
        <Link to="/">
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
