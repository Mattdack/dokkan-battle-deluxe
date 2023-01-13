import React, { useState } from 'react'
import ReactDom from 'react-dom'

import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../util/mutations";

import Auth from "../util/auth";

export default function LoginSignUpModal({ open, children, onClose }) {
    
    const [loginFormData, setLoginFormData] = useState({
      email: "",
      password: "",
    });
  
    const [signUpFormData, setSignUpFormData] = useState({
      username: "",
      email: "",
      password: "",
      password2: "",
    });

    const [loginError, setLoginError] = useState(null);

    const [signUpPasswordError, setSignUpPasswordError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);

    const [validated] = useState(false);

    const [addUser, { error, data }] = useMutation(ADD_USER);
    const [login, { error:error2, data:data2 }] = useMutation(LOGIN_USER);

  if (!open) return null

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //TODO: INSERT THE MUTATION HERE
    try {
      console.log(loginFormData)
      const { data } = await login({
        variables: {
          email: loginFormData.emailLogin,
          password: loginFormData.passwordLogin,
        },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setLoginError(e.message);
      setLoginFormData({
        emailLogin: "",
        passwordLogin: "",
      })
    }
    setLoginFormData({
      emailLogin: "",
      passwordLogin: "",
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(signUpFormData.password !== signUpFormData.password2) {
      event.preventDefault();
      event.stopPropagation();
      return setSignUpError('Your passwords did not match.') 
    }
    //TODO: INSERT THE MUTATION HERE
    try {
      const { data } = await addUser({
        variables: {
          username: signUpFormData.username,
          email: signUpFormData.email,
          password: signUpFormData.password,
        },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setSignUpError(e.message)
    }
    setSignUpFormData({
      username: "",
      email: "",
      password: "",
      password2: ""
    });
  };

  return ReactDom.createPortal(
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[.7] z-[1000]"/>
    <div className="h-fit w-96 fixed right-1/2 translate-x-1/2 translate-y-1/2 bg-white p-12 z-[1000]">
        <button onClick={onClose}>Close Modal</button>
        {children}
        {/* <>TODO: logout button show</> */}
      {Auth.loggedIn() ? (
        <div>
          <h1>Hey you're logged in</h1>
          <button onClick={Auth.logout}>Logout</button>
        </div>
      ) : (
        // TODO: sign up or log in
        <div className="flex flex-col border-2 border-blue-500">
          <form noValidate validated={validated} onSubmit={handleLoginSubmit} className='w-full border-2 border-red-500 p-2'>
            <input
              onChange={handleLoginChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Your email"
              name="emailLogin"
              value={loginFormData.emailLogin}
            ></input>
            <input
              onChange={handleLoginChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Your password"
              name="passwordLogin"
              value={loginFormData.passwordLogin}
            ></input>
            <button
              disabled={
                !(
                  loginFormData.emailLogin &&
                  loginFormData.passwordLogin
                )
              }
              type="submit"
              variant="success"
            >
              Login
            </button>
            {loginError && <p>{loginError}</p>}
          </form>
          <form noValidate validated={validated} onSubmit={handleSignUpSubmit} className='w-full border-2 border-green-500 p-2'>
            <input
              onChange={handleSignupChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Your username"
              name="username"
              value={signUpFormData.username}
            ></input>
            <input
              onChange={handleSignupChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Your email"
              name="email"
              value={signUpFormData.email}
            ></input>
            <input
              onChange={handleSignupChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Your password"
              name="password"
              value={signUpFormData.password}
            ></input>
            <input
              onChange={handleSignupChange}
              className="w-full border-2 border-black"
              type="text"
              placeholder="Write the same password"
              name="password2"
              value={signUpFormData.password2}
            ></input>
            <button
              disabled={
                !(
                  signUpFormData.username &&
                  signUpFormData.email &&
                  signUpFormData.password &&
                  signUpFormData.password2 
                )
              }
              type="submit"
              variant="success"
            >
              Sign up
            </button>
            {signUpError && <p>{signUpError}</p>}
          </form>
        </div>
      )}
    </div>
    </>,
    document.getElementById('LoginPortal')
  )
}
