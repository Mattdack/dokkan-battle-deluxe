// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../util/mutations';

// import { loginUser } from '../utils/API';
import Auth from '../util/auth';

const LoginForm = () => {
 // set initial form state
 const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
 // set state for form validation
 const [validated] = useState(false);
 // set state for alert
 const [showAlert, setShowAlert] = useState(false);

 //TODO: Mutation insert here
 const [login, { error, data }] = useMutation(LOGIN_USER);

 const handleInputChange = (event) => {
   const { name, value } = event.target;
   setUserFormData({ ...userFormData, [name]: value });
 };

 const handleFormSubmit = async (event) => {
   event.preventDefault();

   // check if form has everything (as per react-bootstrap docs)
   const form = event.currentTarget;
   if (form.checkValidity() === false) {
     event.preventDefault();
     event.stopPropagation();
   }
   //TODO: INSERT THE MUTATION HERE
   try {
     const { data } = await login({
       variables: { 
         email:userFormData.email,
         password:userFormData.password
       },
     });
     Auth.login(data.login.token);
   } catch (e) {
     console.error(e);
   }

   setUserFormData({
     username: '',
     email: '',
     password: '',
   });
 };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
