import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../util/mutations";

import Auth from "../util/auth";

import LoginSignUpModal from "./LoginSignUpModal";

const AppNavbar = () => {
  // // set modal display state
  // // const [showModal, setShowModal] = useState(false);
  // const [searchInput, setSearchInput] = useState("");

  // const [loginFormData, setLoginFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [signUpFormData, setSignUpFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const [validated] = useState(false);

  // const [addUser, { error, data }] = useMutation(ADD_USER);
  // const [login, { error:error2, data:data2 }] = useMutation(LOGIN_USER);

  // const handleSignupChange = (event) => {
  //   const { name, value } = event.target;
  //   setSignUpFormData({ ...signUpFormData, [name]: value });
  // };

  // const handleLoginChange = (event) => {
  //   const { name, value } = event.target;
  //   setLoginFormData({ ...loginFormData, [name]: value });
  // };

  // const handleLoginSubmit = async (event) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   //TODO: INSERT THE MUTATION HERE
  //   try {
  //     console.log(loginFormData)
  //     const { data } = await login({
  //       variables: {
  //         email: loginFormData.emailLogin,
  //         password: loginFormData.passwordLogin,
  //       },
  //     });
  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   setSignUpFormData({
  //     email: "",
  //     password: "",
  //   });
  // };

  // const handleSignUpSubmit = async (event) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   //TODO: INSERT THE MUTATION HERE
  //   try {
  //     const { data } = await addUser({
  //       variables: {
  //         username: signUpFormData.username,
  //         email: signUpFormData.email,
  //         password: signUpFormData.password,
  //       },
  //     });
  //     Auth.login(data.addUser.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   setSignUpFormData({
  //     username: "",
  //     email: "",
  //     password: "",
  //   });
  // };


  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-[8vh]">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <LoginSignUpModal open={isOpen} onClose={() => setIsOpen(false)}>
      </LoginSignUpModal>
      {/* <>TODO: logout button show</>
      {Auth.loggedIn() ? (
        <div>
          <h1>Hey you're logged in</h1>
          <button onClick={Auth.logout}>Logout</button>
        </div>
      ) : (
        // TODO: sign up or log in
        <div className="flex flex-row">
          <form noValidate validated={validated} onSubmit={handleSignUpSubmit}>
            <input
              onChange={handleSignupChange}
              className="w-50 h-full border-2 border-black"
              type="text"
              placeholder="Your username"
              name="username"
              value={signUpFormData.username}
            ></input>
            <input
              onChange={handleSignupChange}
              className="w-50 h-full border-2 border-black"
              type="text"
              placeholder="Your email"
              name="email"
              value={signUpFormData.email}
            ></input>
            <input
              onChange={handleSignupChange}
              className="w-50 h-full border-2 border-black"
              type="text"
              placeholder="Your password"
              name="password"
              value={signUpFormData.password}
            ></input>
            <button
              disabled={
                !(
                  signUpFormData.username &&
                  signUpFormData.email &&
                  signUpFormData.password
                )
              }
              type="submit"
              variant="success"
            >
              Sign up
            </button>
          </form>
          <form noValidate validated={validated} onSubmit={handleLoginSubmit}>
            <input
              onChange={handleLoginChange}
              className="w-50 h-full border-2 border-black"
              type="text"
              placeholder="Your email"
              name="emailLogin"
              value={loginFormData.emailLogin}
            ></input>
            <input
              onChange={handleLoginChange}
              className="w-50 h-full border-2 border-black"
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
          </form>
        </div>
      )} */}
    </div>
  );
};

export default AppNavbar;
