import React, { useState } from 'react';
import './LoginPage.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../utils/userService';
import { Error } from 'mongoose';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';




export default function LoginPage({handleSignUpOrLogin}){

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();


  async function handleSubmit(e){
    e.preventDefault();

    try {
      //Making an HTTP request with the credentials saved in the state
      await userService.login(state);
      navigate('/');
      handleSignUpOrLogin()
    } catch (err) {
      console.log(err);
      setError('Error in handleSubmit LoginPage')
    }
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
   

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src="https://icons.iconarchive.com/icons/raindropmemory/in-spirited-we-love/128/Note-icon.png" /> 
        </Header>
        <Form size='large' autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input 
            fluid icon='user'
             iconPosition='left'
             placeholder='email'
             value={state.email} 
             onChange={handleChange}
             />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              value={state.password}
              type='password'
              onChange={handleChange}
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

      );
}

