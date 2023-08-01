import React, { useState } from 'react';
import './LoginPage.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';




export default function LoginPage(props){

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();
   

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src="https://icons.iconarchive.com/icons/raindropmemory/in-spirited-we-love/128/Note-icon.png" /> 
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input 
            fluid icon='user'
             iconPosition='left'
             placeholder='email'
             value={state.email} 
            //  onChange={}
             />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={state.password}
              type='password'
              // onChange={}
            />
  
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to Noteblog? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>


    //   <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    //   <Grid.Column style={{ maxWidth: 450 }}>
    //     <Header as="h2" color="purple" textAlign="center">
    //       <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Login
    //     </Header>
    //     <Form autoComplete="off" >
    //       <Segment stacked>
    //         <Form.Input
    //           type="email"
    //           name="email"
    //           placeholder="email"
    //           value={state.email}
    //           // onChange={handleChange}
    //           required
    //         />
    //         <Form.Input
    //           name="password"
    //           type="password"
    //           placeholder="password"
    //           value={state.password}
    //           // onChange={handleChange}
    //           required
    //         />

    //         <Button type="submit" className="btn">
    //           Login
    //         </Button>
    //       </Segment>
    //       <Message>
    //         New to Us? <Link to="/signup">Sign up</Link>
    //       </Message>
    //       {error ? <ErrorMessage error={error} /> : null}
    //     </Form>
    //   </Grid.Column>
    // </Grid>
      );
}

