import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
  } from "semantic-ui-react";



export default function SignupPage({handleSignUpOrLogin}){

    const [state,setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    });

    const [selectedFile, setSelectedFile] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    function handleFile(e){
        setSelectedFile(e.target.files[0])
    }

    async function handleSumbit(e){
        e.preventDefault();
        //We are creating the formdata required for sending file to the server
        //The HTTP request will be sent in two parts, (1) text (2) filePicture
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('username', state.username);
        formData.append('email', state.username);
        formData.append('password', state.password);
        formData.append('bio', state.bio);

        try {
            //Making fetch request to the server and sending our state object
            const signUp = await userService.signup(formData);
            //Checking the token response
            console.log(signUp);
            //After the signup we can redirect the user to Noteblog homepage
            navigate('/');
            handleSignUpOrLogin();
        } catch (err) {
            console.log(err, 'Error in handleSubmit SignupPage');
            
        }


    }

    return(
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
           <Header as="h2" color="purple" textAlign="center">
            <Image src="https://icons.iconarchive.com/icons/raindropmemory/in-spirited-we-love/128/Note-icon.png" /> Sign Up
          </Header>
          <Form autoComplete="off" >
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="username"
                value={state.username}
                // onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                // onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                // onChange={handleChange}
                required
              />
              <Form.Input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                // onChange={handleChange}
                required
              />
              <Form.TextArea
                label="bio"
                name="bio"
                placeholder="Notes that define you"
                value={state.bio}
                // onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFile}
                />
              </Form.Field>
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>

    );


}